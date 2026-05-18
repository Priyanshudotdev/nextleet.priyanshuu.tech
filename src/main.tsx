import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import "./global.css";
import Dashboard from "./popup/dashboard.tsx";
import { Home } from "./popup/home.tsx";
import LoginSection from "./popup/login.tsx";
import PendingSection from "./popup/pending.tsx";
import RepoSetupSection from "./popup/repo-setup.tsx";
import { storage } from "./shared/storage.ts";

type AuthStatus = "pending" | "completed" | "incomplete" | "repo_pending";

const checkForGithubRepo = async () => {
    return Boolean(await storage.get("github_repo"));
};

const resolveStatus = (status?: string, hasGithubRepo = false): AuthStatus => {
    if (status === "completed" && hasGithubRepo) {
        return "completed";
    }
    if (status === "completed" && !hasGithubRepo) {
        return "repo_pending";
    }
    if (status === "pending") {
        return "pending";
    }
    return "incomplete";
};

const AppRoutes = () => {
    const [authStatus, setAuthStatus] = useState<AuthStatus>("incomplete");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const resolveAuthStatus = async () => {
            const [authState, hasGithubRepo] = await Promise.all([
                storage.get<{ status?: string }>("auth_state"),
                checkForGithubRepo(),
            ]);

            setAuthStatus(resolveStatus(authState?.status, hasGithubRepo));
            setLoading(false);
        };

        resolveAuthStatus();

        const onStorageChanged: Parameters<typeof chrome.storage.onChanged.addListener>[0] = (
            changes,
            areaName
        ) => {
            if (areaName !== "sync") {
                return;
            }

            const authStateChange = changes.auth_state;
            const githubRepoChange = changes.github_repo;
            if (!authStateChange && !githubRepoChange) {
                return;
            }

            const applyStatusUpdate = async () => {
                const [authState, hasGithubRepo] = await Promise.all([
                    storage.get<{ status?: string }>("auth_state"),
                    checkForGithubRepo(),
                ]);

                setAuthStatus(resolveStatus(authState?.status, hasGithubRepo));
            };

            applyStatusUpdate();
        };

        chrome.storage.onChanged.addListener(onStorageChanged);

        return () => {
            chrome.storage.onChanged.removeListener(onStorageChanged);
        };
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
                        <Navigate to="/dashboard" replace />
                    ) : authStatus === "repo_pending" ? (
                        <Navigate to="/repo-setup" replace />
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
                    ) : authStatus === "repo_pending" ? (
                        <Navigate to="/repo-setup" replace />
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
                    authStatus === "pending" || authStatus === "incomplete" ? (
                        <PendingSection />
                    ) : authStatus === "repo_pending" ? (
                        <Navigate to="/repo-setup" replace />
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
                    ) : authStatus === "repo_pending" ? (
                        <Navigate to="/repo-setup" replace />
                    ) : authStatus === "pending" ? (
                        <Navigate to="/pending" replace />
                    ) : (
                        <Navigate to="/" replace />
                    )
                }
            />

            <Route
                path="/repo-setup"
                element={
                    authStatus === "repo_pending" ? (
                        <RepoSetupSection />
                    ) : authStatus === "completed" ? (
                        <Navigate to="/dashboard" replace />
                    ) : authStatus === "pending" ? (
                        <Navigate to="/pending" replace />
                    ) : (
                        <Navigate to="/" replace />
                    )
                }
            />
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
