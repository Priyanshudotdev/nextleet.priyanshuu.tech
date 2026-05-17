import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import "./global.css";
import { Dashboard } from "./popup/dashboard.tsx";
import { Home } from "./popup/home.tsx";
import LoginSection from "./popup/login.tsx";
import PendingSection from "./popup/pending.tsx";
import { storage } from "./shared/storage.ts";
import {Toaster} from "sonner";

type AuthStatus = "pending" | "completed" | "incomplete";

const AppRoutes = () => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>("incomplete");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const resolveAuthStatus = async () => {
      const authState = await storage.get<{ status?: string }>("auth_state");
      if (authState?.status === "completed") {
        setAuthStatus("completed");
      } else if (authState?.status === "pending") {
        setAuthStatus("pending");
      } else {
        setAuthStatus("incomplete");
      }
      setLoading(false);
    };

    resolveAuthStatus();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <Routes>
      <Route path="/index.html" element={<Navigate to="/" replace />} />

      <Route
        path="/"
        element={
          authStatus === "completed" ? (
            <Navigate to="/dasmboard" replace />
          ) : authStatus === "pending" ? (
            <Navigate to="/pending" replace />
          ) : (
            <Home />
          )
        }
      />

      <Route
        path="/login"
        element={
          authStatus === "completed" ? (
            <Navigate to="/dashboard" replace />
          ) : authStatus === "pending" ? (
            <Navigate to="/pending" replace />
          ) : (
            <LoginSection />
          )
        }
      />

      <Route
        path="/pending"
        element={
          authStatus === "pending" ? (
            <PendingSection />
          ) : authStatus === "completed" ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      <Route
        path="/dashboard"
        element={
          authStatus === "completed" ? (
            <Dashboard />
          ) : authStatus === "pending" ? (
            <Navigate to="/pending" replace />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      <Route path="/repo-setup" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="relative w-90 min-h-120 text-[#2A2A2C] bg-[#FEF6F8]">
      <HashRouter>
        <AppRoutes />
        <Toaster position="top-center" />
      </HashRouter>
    </div>
  </StrictMode>
);
