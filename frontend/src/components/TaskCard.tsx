"use client";

import { Task } from "@/types";
import { formatDistanceToNow } from "date-fns";
import {
  Edit2,
  Trash2,
  CheckCircle2,
  Clock,
  AlertCircle,
  MoreVertical,
  Calendar,
} from "lucide-react";
import { useState } from "react";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  viewMode?: "grid" | "list";
}

const statusConfig = {
  PENDING: {
    gradient: "from-yellow-400 via-orange-400 to-amber-500",
    bgGradient:
      "from-yellow-50 via-orange-50 to-amber-50 dark:from-yellow-900/20 dark:via-orange-900/20 dark:to-amber-900/20",
    textColor: "text-yellow-700 dark:text-yellow-400",
    borderColor: "border-yellow-200 dark:border-yellow-800/50",
    glowColor: "shadow-yellow-500/20 dark:shadow-yellow-500/10",
    icon: Clock,
    label: "Pending",
  },
  IN_PROGRESS: {
    gradient: "from-blue-400 via-indigo-500 to-purple-500",
    bgGradient:
      "from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20",
    textColor: "text-blue-700 dark:text-blue-400",
    borderColor: "border-blue-200 dark:border-blue-800/50",
    glowColor: "shadow-blue-500/20 dark:shadow-blue-500/10",
    icon: AlertCircle,
    label: "In Progress",
  },
  COMPLETED: {
    gradient: "from-green-400 via-emerald-500 to-teal-500",
    bgGradient:
      "from-green-50 via-emerald-50 to-teal-50 dark:from-green-900/20 dark:via-emerald-900/20 dark:to-teal-900/20",
    textColor: "text-green-700 dark:text-green-400",
    borderColor: "border-green-200 dark:border-green-800/50",
    glowColor: "shadow-green-500/20 dark:shadow-green-500/10",
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
  const [showMenu, setShowMenu] = useState(false);
  const config = statusConfig[task.status];
  const StatusIcon = config.icon;

  if (viewMode === "list") {
    return (
      <div className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm hover:shadow-lg transition-all duration-300">
        <div className="flex items-center gap-4">
          {/* Status Indicator */}
          <div
            className={`w-1 h-16 rounded-full bg-gradient-to-b ${config.gradient} shadow-lg ${config.glowColor}`}
          ></div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {task.title}
                </h3>
                {task.description && (
                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-1">
                    {task.description}
                  </p>
                )}
              </div>

              {/* Status Badge */}
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${config.bgGradient} border ${config.borderColor} whitespace-nowrap`}
              >
                <StatusIcon className={`w-4 h-4 ${config.textColor}`} />
                <span className={`text-xs font-semibold ${config.textColor}`}>
                  {config.label}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-500">
                <Calendar className="w-3.5 h-3.5" />
                <span>
                  {formatDistanceToNow(new Date(task.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggle(task.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                task.status === "COMPLETED"
                  ? "bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:hover:bg-yellow-900/40 text-yellow-700 dark:text-yellow-400"
                  : "bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-900/40 text-green-700 dark:text-green-400"
              }`}
            >
              {task.status === "COMPLETED" ? "Reopen" : "Complete"}
            </button>
            <button
              onClick={() => onEdit(task)}
              className="p-2 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/40 text-blue-700 dark:text-blue-400 rounded-lg transition-all"
              aria-label="Edit task"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="p-2 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/40 text-red-700 dark:text-red-400 rounded-lg transition-all"
              aria-label="Delete task"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      {/* Gradient Accent */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${config.gradient}`}
      ></div>

      {/* Status Badge */}
      <div className="flex justify-between items-start mb-4">
        <div
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${config.bgGradient} border ${config.borderColor} shadow-sm ${config.glowColor}`}
        >
          <StatusIcon className={`w-4 h-4 ${config.textColor}`} />
          <span className={`text-xs font-semibold ${config.textColor}`}>
            {config.label}
          </span>
        </div>

        {/* Menu Button */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors opacity-0 group-hover:opacity-100"
            aria-label="More options"
          >
            <MoreVertical className="w-4 h-4 text-slate-600 dark:text-slate-400" />
          </button>

          {showMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowMenu(false)}
              ></div>
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-20 overflow-hidden">
                <button
                  onClick={() => {
                    onEdit(task);
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-3 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-3"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Task
                </button>
                <button
                  onClick={() => {
                    onDelete(task.id);
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-3 text-left text-sm hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors flex items-center gap-3"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Task
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors min-h-[3.5rem]">
        {task.title}
      </h3>

      {/* Description */}
      {task.description && (
        <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm line-clamp-3 leading-relaxed min-h-[4rem]">
          {task.description}
        </p>
      )}

      {/* Timestamp */}
      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-500 mb-5 pt-3 border-t border-slate-100 dark:border-slate-700">
        <Calendar className="w-3.5 h-3.5" />
        <span>
          Created{" "}
          {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => onToggle(task.id)}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all shadow-sm hover:shadow-md ${
            task.status === "COMPLETED"
              ? "bg-gradient-to-r from-yellow-100 to-orange-100 hover:from-yellow-200 hover:to-orange-200 dark:from-yellow-900/30 dark:to-orange-900/30 dark:hover:from-yellow-900/40 dark:hover:to-orange-900/40 text-yellow-700 dark:text-yellow-400"
              : "bg-gradient-to-r from-green-100 to-emerald-100 hover:from-green-200 hover:to-emerald-200 dark:from-green-900/30 dark:to-emerald-900/30 dark:hover:from-green-900/40 dark:hover:to-emerald-900/40 text-green-700 dark:text-green-400"
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          {task.status === "COMPLETED" ? "Reopen" : "Complete"}
        </button>
        <button
          onClick={() => onEdit(task)}
          className="p-2.5 bg-gradient-to-br from-blue-100 to-indigo-100 hover:from-blue-200 hover:to-indigo-200 dark:from-blue-900/30 dark:to-indigo-900/30 dark:hover:from-blue-900/40 dark:hover:to-indigo-900/40 text-blue-700 dark:text-blue-400 rounded-xl transition-all shadow-sm hover:shadow-md"
          aria-label="Edit task"
        >
          <Edit2 className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="p-2.5 bg-gradient-to-br from-red-100 to-pink-100 hover:from-red-200 hover:to-pink-200 dark:from-red-900/30 dark:to-pink-900/30 dark:hover:from-red-900/40 dark:hover:to-pink-900/40 text-red-700 dark:text-red-400 rounded-xl transition-all shadow-sm hover:shadow-md"
          aria-label="Delete task"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
