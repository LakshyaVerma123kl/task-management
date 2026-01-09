import api from "@/lib/axios";
import { LoginResponse, RegisterResponse } from "@/types";

export const authService = {
  register: async (email: string, password: string, name?: string) => {
    const response = await api.post<RegisterResponse>("/auth/register", {
      email,
      password,
      name,
    });
    return response.data;
  },

  login: async (email: string, password: string) => {
    const response = await api.post<LoginResponse>("/auth/login", {
      email,
      password,
    });
    return response.data;
  },

  logout: async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    }
  },
};
