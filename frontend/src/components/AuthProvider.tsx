"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  userId: string;
  email: string;
  exp: number;
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setUser, isAuthenticated } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const publicPaths = ["/login", "/register"];

    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);

        if (decoded.exp * 1000 > Date.now()) {
          setUser({
            id: decoded.userId,
            email: decoded.email,
            name: null,
          });

          if (publicPaths.includes(pathname)) {
            router.push("/dashboard");
          }
        } else {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          setUser(null);
        }
      } catch (error) {
        console.error("Token decode error:", error);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setUser(null);
      }
    } else if (!publicPaths.includes(pathname) && pathname !== "/") {
      router.push("/login");
    }
  }, [pathname, router, setUser]);

  return <>{children}</>;
}
