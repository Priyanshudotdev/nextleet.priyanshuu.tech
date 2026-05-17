import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./use-auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Protected route component that handles auth redirects
 * - Redirects to /pending if auth is incomplete
 * - Redirects to /auth-failed if auth failed
 * - Shows loading state while checking auth
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const { status, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    if (status === "pending") {
      navigate("/pending", { replace: true });
    } else if (status === "failed") {
      navigate("/auth-failed", { replace: true });
    }
  }, [status, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-120 w-90">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto mb-4"></div>
          <p className="text-gray-500">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
