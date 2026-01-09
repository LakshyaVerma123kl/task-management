"use client";

import { Task } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { Edit2, Trash2, CheckCircle2, Clock, AlertCircle } from "lucide-react";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

const statusConfig = {
  PENDING: {
    color: "from-yellow-400 to-orange-400",
    bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    textColor: "text-yellow-700 dark:text-yellow-400",
    borderColor: "border-yellow-200 dark:border-yellow-800",
    icon: Clock,
    label: "Pending",
  },
  IN_PROGRESS: {
    color: "from-blue-400 to-indigo-500",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    textColor: "text-blue-700 dark:text-blue-400",
    borderColor: "border-blue-200 dark:border-blue-800",
    icon: AlertCircle,
    label: "In Progress",
  },
  COMPLETED: {
    color: "from-green-400 to-emerald-500",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    textColor: "text-green-700 dark:text-green-400",
    borderColor: "border-green-200 dark:border-green-800",
    icon: CheckCircle2,
    label: "Completed",
  },
};

export default function TaskCard({
  task,
  onEdit,
  onDelete,
  onToggle,
}: TaskCardProps) {
  const config = statusConfig[task.status];
  const StatusIcon = config.icon;

  return (
    <div className="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in">
      {/* Status Badge */}
      <div className="flex justify-between items-start mb-4">
        <div
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${config.bgColor} border ${config.borderColor}`}
        >
          <StatusIcon className={`w-4 h-4 ${config.textColor}`} />
          <span className={`text-xs font-semibold ${config.textColor}`}>
            {config.label}
          </span>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {task.title}
      </h3>

      {/* Description */}
      {task.description && (
        <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm line-clamp-3 leading-relaxed">
          {task.description}
        </p>
      )}

      {/* Timestamp */}
      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-500 mb-5">
        <Clock className="w-3.5 h-3.5" />
        <span>
          Created{" "}
          {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => onToggle(task.id)}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${
            task.status === "COMPLETED"
              ? "bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:hover:bg-yellow-900/40 text-yellow-700 dark:text-yellow-400"
              : "bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-900/40 text-green-700 dark:text-green-400"
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          {task.status === "COMPLETED" ? "Reopen" : "Complete"}
        </button>
        <button
          onClick={() => onEdit(task)}
          className="p-2.5 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/40 text-blue-700 dark:text-blue-400 rounded-xl transition-all"
          aria-label="Edit task"
        >
          <Edit2 className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="p-2.5 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/40 text-red-700 dark:text-red-400 rounded-xl transition-all"
          aria-label="Delete task"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
