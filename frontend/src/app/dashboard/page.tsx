"use client";

import { useState, useEffect } from "react";
import { taskService } from "@/services/task.service";
import { Task, TaskStatus, CreateTaskData, UpdateTaskData } from "@/types";
import TaskCard from "@/components/TaskCard";
import TaskModal from "@/components/TaskModal";
import toast from "react-hot-toast";
import {
  Plus,
  Search,
  Filter,
  LayoutGrid,
  List,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
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
    const debounce = setTimeout(() => {
      fetchTasks();
    }, 300);
    return () => clearTimeout(debounce);
  }, [filters.status, filters.search, filters.page]);

  const handleCreateTask = async (data: CreateTaskData) => {
    try {
      await taskService.createTask(data);
      toast.success("Task created successfully!");
      fetchTasks();
    } catch (error: any) {
      toast.error("Failed to create task");
    }
  };

  const handleUpdateTask = async (data: UpdateTaskData) => {
    if (!editingTask) return;
    try {
      await taskService.updateTask(editingTask.id, data);
      toast.success("Task updated!");
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
      toast.success("Task deleted");
      fetchTasks();
    } catch (error: any) {
      toast.error("Failed to delete task");
    }
  };

  const handleToggleTask = async (id: string) => {
    try {
      await taskService.toggleTask(id);
      fetchTasks();
    } catch (error: any) {
      toast.error("Failed to update status");
    }
  };

  const handleOpenModal = (task?: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  // Stats calculation
  const stats = {
    total: pagination.total,
    pending: tasks.filter((t) => t.status === "PENDING").length,
    inProgress: tasks.filter((t) => t.status === "IN_PROGRESS").length,
    completed: tasks.filter((t) => t.status === "COMPLETED").length,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 animate-fade-in">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2">
            My Tasks
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Welcome back! Here's what's on your plate.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="group px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 whitespace-nowrap"
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          Create New Task
        </button>
      </div>

      {/* Stats Grid */}
      <div
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 animate-slide-up"
        style={{ animationDelay: "100ms" }}
      >
        {[
          {
            label: "Total Tasks",
            value: stats.total,
            icon: LayoutGrid,
            color: "text-blue-600",
            bg: "bg-blue-50 dark:bg-blue-900/20",
          },
          {
            label: "Pending",
            value: stats.pending,
            icon: Clock,
            color: "text-amber-600",
            bg: "bg-amber-50 dark:bg-amber-900/20",
          },
          {
            label: "In Progress",
            value: stats.inProgress,
            icon: TrendingUp,
            color: "text-indigo-600",
            bg: "bg-indigo-50 dark:bg-indigo-900/20",
          },
          {
            label: "Completed",
            value: stats.completed,
            icon: CheckCircle2,
            color: "text-emerald-600",
            bg: "bg-emerald-50 dark:bg-emerald-900/20",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {stat.label}
              </p>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">
                {stat.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Filters & Controls */}
      <div
        className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm sticky top-20 z-30 animate-slide-up"
        style={{ animationDelay: "200ms" }}
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Search tasks by title..."
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value, page: 1 })
              }
              className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900/50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500/50 text-slate-900 dark:text-white transition-all placeholder:text-slate-400"
            />
          </div>

          <div className="flex gap-3">
            <div className="relative flex-1 md:flex-none md:w-48">
              <select
                value={filters.status}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    status: e.target.value as TaskStatus | "",
                    page: 1,
                  })
                }
                className="w-full pl-4 pr-10 py-3 bg-slate-50 dark:bg-slate-900/50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500/50 text-slate-900 dark:text-white appearance-none cursor-pointer font-medium"
              >
                <option value="">All Statuses</option>
                <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
              <Filter className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>

            <div className="flex bg-slate-50 dark:bg-slate-900/50 p-1.5 rounded-xl gap-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "grid"
                    ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                }`}
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "list"
                    ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="min-h-[300px]">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-48 bg-slate-100 dark:bg-slate-800/50 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
              <Search className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              No tasks found
            </h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-md">
              {filters.search || filters.status
                ? "Try adjusting your filters to find what you're looking for."
                : "You're all caught up! Create a new task to get started."}
            </p>
            {(filters.search || filters.status) && (
              <button
                onClick={() => setFilters({ status: "", search: "", page: 1 })}
                className="mt-6 px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-medium"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }
          >
            {tasks.map((task, index) => (
              <div
                key={task.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <TaskCard
                  task={task}
                  onEdit={handleOpenModal}
                  onDelete={handleDeleteTask}
                  onToggle={handleToggleTask}
                  viewMode={viewMode}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(undefined);
        }}
        onCreate={handleCreateTask}
        onUpdate={handleUpdateTask}
        task={editingTask}
      />
    </div>
  );
}
