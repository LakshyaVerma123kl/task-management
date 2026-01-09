"use client";

import { Task } from "@/types";
import { formatDistanceToNow } from "date-fns";
import {
  Edit2,
  Trash2,
  CheckCircle2,
  Clock,
  AlertCircle,
  Calendar,
} from "lucide-react";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  viewMode?: "grid" | "list";
}

const statusConfig = {
  PENDING: {
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-900/20",
    border: "border-amber-200 dark:border-amber-700/30",
    icon: Clock,
    label: "Pending",
  },
  IN_PROGRESS: {
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-900/20",
    border: "border-blue-200 dark:border-blue-700/30",
    icon: AlertCircle,
    label: "In Progress",
  },
  COMPLETED: {
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    border: "border-emerald-200 dark:border-emerald-700/30",
    icon: CheckCircle2,
    label: "Completed",
  },
};

export default function TaskCard({
  task,
  onEdit,
  onDelete,
  onToggle,
  viewMode = "grid",
}: TaskCardProps) {
  const config = statusConfig[task.status];
  const StatusIcon = config.icon;

  if (viewMode === "list") {
    return (
      <div className="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-lg transition-all duration-300">
        <div className={`p-3 rounded-xl ${config.bg} ${config.color} shrink-0`}>
          <StatusIcon className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white truncate">
            {task.title}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm truncate mt-0.5">
            {task.description || "No description provided"}
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-400 shrink-0">
          <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-900/50 px-3 py-1.5 rounded-lg">
            <Calendar className="w-3.5 h-3.5" />
            {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
          </div>
        </div>

        <div className="flex items-center gap-2 sm:border-l sm:border-slate-100 dark:sm:border-slate-700 sm:pl-4">
          <button
            onClick={() => onToggle(task.id)}
            className={`p-2 rounded-lg transition-colors ${
              task.status === "COMPLETED"
                ? "text-slate-400 hover:text-amber-600 hover:bg-amber-50"
                : "text-slate-400 hover:text-emerald-600 hover:bg-emerald-50"
            }`}
            title={
              task.status === "COMPLETED"
                ? "Mark as Incomplete"
                : "Mark as Completed"
            }
          >
            <CheckCircle2 className="w-5 h-5" />
          </button>
          <button
            onClick={() => onEdit(task)}
            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
          >
            <Edit2 className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${config.bg} ${config.color} border ${config.border}`}
        >
          <StatusIcon className="w-3.5 h-3.5" />
          {config.label}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
          <Calendar className="w-3.5 h-3.5" />
          {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
        </div>
      </div>

      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 leading-tight">
        {task.title}
      </h3>

      <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed flex-1">
        {task.description || "No description provided."}
      </p>

      <div className="pt-4 border-t border-slate-100 dark:border-slate-700/50 flex items-center justify-between gap-3">
        <button
          onClick={() => onToggle(task.id)}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            task.status === "COMPLETED"
              ? "bg-amber-50 hover:bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:hover:bg-amber-900/30 dark:text-amber-400"
              : "bg-emerald-50 hover:bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/30 dark:text-emerald-400"
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          {task.status === "COMPLETED" ? "Reopen" : "Complete"}
        </button>

        <div className="flex gap-1">
          <button
            onClick={() => onEdit(task)}
            className="p-2.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:text-slate-400 dark:hover:text-blue-400 dark:hover:bg-blue-900/20 rounded-xl transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2.5 text-slate-500 hover:text-red-600 hover:bg-red-50 dark:text-slate-400 dark:hover:text-red-400 dark:hover:bg-red-900/20 rounded-xl transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
