export interface User {
  id: string;
  email: string;
  name: string | null;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  message: string;
  user: User;
  tokens: AuthTokens;
}

export interface RegisterResponse {
  message: string;
  user: User;
  tokens: AuthTokens;
}

export type TaskStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED";

export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

export interface TasksResponse {
  tasks: Task[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CreateTaskData {
  title: string;
  description?: string;
  status?: TaskStatus;
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  status?: TaskStatus;
}
