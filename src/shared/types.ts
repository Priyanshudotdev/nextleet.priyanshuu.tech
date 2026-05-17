/**
 * Authentication state types for the extension
 */

export type AuthStatus = "idle" | "loading" | "authenticated" | "pending" | "failed";

export interface AuthUser {
  id: string;
  token: string;
  githubUsername?: string;
  leetcodeUsername?: string;
  email?: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  status: AuthStatus;
  error: string | null;
  isLoading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  setAuthStatus: (status: AuthStatus) => void;
  setAuthError: (error: string | null) => void;
  updateUserProfile: (data: Partial<AuthUser>) => Promise<void>;
}

export interface AuthStorageData {
  user: AuthUser | null;
  status: AuthStatus;
  lastUpdated: number;
}
