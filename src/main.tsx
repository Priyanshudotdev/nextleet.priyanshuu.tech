import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import "./global.css";
import { Home } from "./popup/home.tsx";
import LoginSection from "./popup/login.tsx";
import RepoSetupSection from "./popup/repo-setup.tsx";
import { PendingPage } from "./popup/pending.tsx";
import { AuthFailedPage } from "./popup/auth-failed.tsx";
import { AuthProvider } from "./shared/auth-context.tsx";
import { ProtectedRoute } from "./shared/protected-route.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
    <div className="relative w-90 min-h-120 text-[#2A2A2C] bg-[#FEF6F8]">
      <HashRouter>
        <Routes>
          <Route path="/index.html" element={<Navigate to="/" replace />} />
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<LoginSection />} />
            <Route
              path="/repo-setup"
              element={
                <ProtectedRoute>
                  <RepoSetupSection />
                </ProtectedRoute>
              }
            />

            {/* Auth Status Routes */}
            <Route path="/pending" element={<PendingPage />} />
            <Route path="/auth-failed" element={<AuthFailedPage />} />

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </div>
    </AuthProvider>
  </StrictMode>
);
