"use client";

import { useState, useEffect } from "react";
import { taskService } from "@/services/task.service";
import { Task, TaskStatus, CreateTaskData, UpdateTaskData } from "@/types";
import TaskCard from "@/components/TaskCard";
import TaskModal from "@/components/TaskModal";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [filters, setFilters] = useState({
    status: "" as TaskStatus | "",
    search: "",
    page: 1,
  });
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0,
    page: 1,
    limit: 10,
  });

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const params: any = { page: filters.page, limit: 10 };
      if (filters.status) params.status = filters.status;
      if (filters.search) params.search = filters.search;

      const response = await taskService.getTasks(params);
      setTasks(response.tasks);
      setPagination(response.pagination);
    } catch (error: any) {
      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  const handleCreateTask = async (data: CreateTaskData) => {
    try {
      await taskService.createTask(data);
      toast.success("Task created successfully");
      fetchTasks();
    } catch (error: any) {
      toast.error("Failed to create task");
    }
  };

  const handleUpdateTask = async (data: UpdateTaskData) => {
    if (!editingTask) return;
    try {
      await taskService.updateTask(editingTask.id, data);
      toast.success("Task updated successfully");
      fetchTasks();
      setEditingTask(undefined);
    } catch (error: any) {
      toast.error("Failed to update task");
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      await taskService.deleteTask(id);
      toast.success("Task deleted successfully");
      fetchTasks();
    } catch (error: any) {
      toast.error("Failed to delete task");
    }
  };

  const handleToggleTask = async (id: string) => {
    try {
      await taskService.toggleTask(id);
      toast.success("Task status updated");
      fetchTasks();
    } catch (error: any) {
      toast.error("Failed to update task status");
    }
  };

  const handleOpenModal = (task?: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(undefined);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Tasks</h1>
        <p className="text-gray-600">
          Manage and organize your tasks efficiently
        </p>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search tasks..."
          value={filters.search}
          onChange={(e) =>
            setFilters({ ...filters, search: e.target.value, page: 1 })
          }
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={filters.status}
          onChange={(e) =>
            setFilters({
              ...filters,
              status: e.target.value as TaskStatus | "",
              page: 1,
            })
          }
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>

        <button
          onClick={() => handleOpenModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors whitespace-nowrap"
        >
          + New Task
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading tasks...</p>
        </div>
      ) : tasks.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-600 text-lg">No tasks found</p>
          <button
            onClick={() => handleOpenModal()}
            className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
          >
            Create your first task
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleOpenModal}
                onDelete={handleDeleteTask}
                onToggle={handleToggleTask}
              />
            ))}
          </div>

          {pagination.totalPages > 1 && (
            <div className="flex justify-center gap-2">
              <button
                onClick={() =>
                  setFilters({ ...filters, page: filters.page - 1 })
                }
                disabled={filters.page === 1}
                className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              <span className="px-4 py-2">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              <button
                onClick={() =>
                  setFilters({ ...filters, page: filters.page + 1 })
                }
                disabled={filters.page === pagination.totalPages}
                className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onCreate={handleCreateTask}
        onUpdate={handleUpdateTask}
        task={editingTask}
      />
    </div>
  );
}
