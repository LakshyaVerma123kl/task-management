"use client";

import { useState, useEffect } from "react";
import { Task, TaskStatus, CreateTaskData, UpdateTaskData } from "@/types";
import { X } from "lucide-react";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateTaskData | UpdateTaskData) => void;
  task?: Task;
}

export default function TaskModal({
  isOpen,
  onClose,
  onSubmit,
  task,
}: TaskModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "PENDING" as TaskStatus,
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description || "",
        status: task.status,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        status: "PENDING",
      });
    }
  }, [task, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-lg w-full shadow-2xl animate-slide-up max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {task ? "Edit Task" : "Create New Task"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-slate-500 dark:text-slate-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
            >
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 text-slate-900 dark:text-white transition-all"
              placeholder="Enter task title"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 text-slate-900 dark:text-white resize-none transition-all"
              placeholder="Enter task description (optional)"
            />
          </div>

          <div>
            <label
              htmlFor="status"
              className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
            >
              Status
            </label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as TaskStatus,
                })
              }
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 text-slate-900 dark:text-white transition-all"
            >
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 font-medium transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-xl"
            >
              {task ? "Update Task" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
