"use client";

import React from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import AuthProvider from "@/components/AuthProvider";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
          <Navbar />
          <main className="pt-4">{children}</main>
          <Toaster
            position="top-right"
            containerStyle={{
              top: 80, // Position below the 4rem (64px) navbar + padding
              right: 20,
            }}
            toastOptions={{
              duration: 4000,
              style: {
                background: "var(--background)",
                color: "var(--foreground)",
                border: "1px solid rgba(226, 232, 240, 0.2)",
                backdropFilter: "blur(8px)",
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                borderRadius: "1rem",
                padding: "1rem",
                fontSize: "0.875rem",
                fontWeight: 500,
              },
              className:
                "dark:border-slate-700/50 dark:bg-slate-800/90 bg-white/90",
              success: {
                iconTheme: {
                  primary: "#10b981",
                  secondary: "#fff",
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: "#ef4444",
                  secondary: "#fff",
                },
              },
            }}
          />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}
