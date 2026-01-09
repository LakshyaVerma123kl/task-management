import api from "@/lib/axios";
import {
  Task,
  TasksResponse,
  CreateTaskData,
  UpdateTaskData,
  TaskStatus,
} from "@/types";

export const taskService = {
  getTasks: async (params?: {
    page?: number;
    limit?: number;
    status?: TaskStatus;
    search?: string;
  }) => {
    const response = await api.get<TasksResponse>("/tasks", { params });
    return response.data;
  },

  getTaskById: async (id: string) => {
    const response = await api.get<{ task: Task }>(`/tasks/${id}`);
    return response.data.task;
  },

  createTask: async (data: CreateTaskData) => {
    const response = await api.post<{ message: string; task: Task }>(
      "/tasks",
      data
    );
    return response.data;
  },

  updateTask: async (id: string, data: UpdateTaskData) => {
    const response = await api.patch<{ message: string; task: Task }>(
      `/tasks/${id}`,
      data
    );
    return response.data;
  },

  deleteTask: async (id: string) => {
    const response = await api.delete<{ message: string }>(`/tasks/${id}`);
    return response.data;
  },

  toggleTask: async (id: string) => {
    const response = await api.post<{ message: string; task: Task }>(
      `/tasks/${id}/toggle`
    );
    return response.data;
  },
};
