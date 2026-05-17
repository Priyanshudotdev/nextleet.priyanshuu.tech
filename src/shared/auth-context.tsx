import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import type { AuthContextType, AuthStatus, AuthStorageData, AuthUser } from "./types";

const STORAGE_KEY = "nextleet_auth";
const AUTH_TIMEOUT = 30000; // 30 seconds

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [status, setStatus] = useState<AuthStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load auth state from storage on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        const stored = await chrome.storage.sync.get(STORAGE_KEY);
        const authData = stored[STORAGE_KEY] as AuthStorageData | undefined;

        if (authData?.user) {
          setUser(authData.user);
          setStatus(authData.status || "idle");
        } else {
          setStatus("idle");
        }
      } catch (err) {
        console.error("Failed to initialize auth:", err);
        setError("Failed to load authentication data");
        setStatus("failed");
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Persist auth state to storage
  const persistAuth = useCallback(
    async (newUser: AuthUser | null, newStatus: AuthStatus) => {
      try {
        const authData: AuthStorageData = {
          user: newUser,
          status: newStatus,
          lastUpdated: Date.now(),
        };
        await chrome.storage.sync.set({ [STORAGE_KEY]: authData });
      } catch (err) {
        console.error("Failed to persist auth:", err);
        throw new Error("Failed to save authentication data");
      }
    },
    []
  );

  const login = useCallback(
    async (token: string) => {
      try {
        setIsLoading(true);
        setStatus("loading");
        setError(null);

        // Validate token format
        if (!token || token.length === 0) {
          throw new Error("Invalid token provided");
        }

        // Simulate API validation (replace with actual GitHub API call)
        const validatePromise = new Promise<AuthUser>((resolve, reject) => {
          const timeout = setTimeout(() => {
            reject(new Error("Authentication timeout"));
          }, AUTH_TIMEOUT);

          // Decode token to extract user info
          try {
            const decoded = JSON.parse(atob(token));
            clearTimeout(timeout);

            if (!decoded.id || !decoded.token) {
              throw new Error("Invalid token structure");
            }

            resolve(decoded as AuthUser);
          } catch (err) {
            clearTimeout(timeout);
            reject(new Error("Failed to parse authentication token"));
          }
        });

        const newUser = await validatePromise;
        setUser(newUser);
        setStatus("authenticated");
        await persistAuth(newUser, "authenticated");
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Authentication failed";
        setError(errorMessage);
        setStatus("failed");
        setUser(null);
        await persistAuth(null, "failed");
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [persistAuth]
  );

  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      await chrome.storage.sync.remove(STORAGE_KEY);
      setUser(null);
      setStatus("idle");
      setError(null);
    } catch (err) {
      console.error("Failed to logout:", err);
      throw new Error("Logout failed");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateUserProfile = useCallback(
    async (data: Partial<AuthUser>) => {
      try {
        if (!user) {
          throw new Error("No user logged in");
        }

        const updatedUser = { ...user, ...data };
        setUser(updatedUser);
        await persistAuth(updatedUser, "authenticated");
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to update profile";
        setError(errorMessage);
        throw err;
      }
    },
    [user, persistAuth]
  );

  const setAuthStatus = useCallback((newStatus: AuthStatus) => {
    setStatus(newStatus);
  }, []);

  const setAuthError = useCallback((newError: string | null) => {
    setError(newError);
  }, []);

  const value: AuthContextType = useMemo(
    () => ({
      user,
      status,
      error,
      isLoading,
      login,
      logout,
      setAuthStatus,
      setAuthError,
      updateUserProfile,
    }),
    [user, status, error, isLoading, login, logout, setAuthStatus, setAuthError, updateUserProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
