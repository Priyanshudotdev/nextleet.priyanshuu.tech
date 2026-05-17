import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../shared/use-auth";
import Button from "./components/button";
import Footer from "./components/footer";
import Layout from "./components/layout";
import Logo from "./components/logo";

const RepoSetupSection = () => {
  const navigate = useNavigate();
  const { user, updateUserProfile, isLoading } = useAuth();

  const [repoUrl, setRepoUrl] = useState<string>("");
  const [localLoading, setLocalLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const validateRepoUrl = useCallback((url: string): boolean => {
    const githubRepoRegex =
      /^(https?:\/\/)?(github\.com\/)?[a-zA-Z0-9_-]+\/[a-zA-Z0-9_.-]+\/?$/;
    return githubRepoRegex.test(url);
  }, []);

  const handleLinkRepo = useCallback(async () => {
    try {
      setError(null);
      setSuccess(false);

      if (!repoUrl.trim()) {
        setError("Please enter a repository URL");
        return;
      }

      if (!validateRepoUrl(repoUrl)) {
        setError("Invalid GitHub repository URL format");
        return;
      }

      setLocalLoading(true);

      await updateUserProfile({
        ...user,
        githubUsername: repoUrl.split("/")[repoUrl.split("/").length - 2],
      } as any);

      setSuccess(true);
      setRepoUrl("");

      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1500);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to link repository";
      setError(errorMessage);
      console.error("Link repo error:", err);
    } finally {
      setLocalLoading(false);
    }
  }, [repoUrl, validateRepoUrl, user, updateUserProfile, navigate]);

  const handleBackClick = useCallback(() => {
    navigate("/", { replace: true });
  }, [navigate]);

  return (
    <Layout>
      <div className="h-120 gap-y-6 text-5xl flex flex-col items-center justify-center px-4">
        <div className="flex flex-col gap-y-2 items-center justify-center">
          <Logo />
          <p className="text-sm tracking-tight">Step 2 / 3</p>
        </div>

        <div className="flex flex-col items-center justify-center gap-4">
          <div className="text-center">
            <h1 className="text-2xl font-semibold mb-2">Link Repository</h1>
            <p className="text-center leading-5 text-[#71717A] text-sm">
              Enter your GitHub repository URL where we'll push your LeetCode solutions
            </p>
          </div>
        </div>

        {error && (
          <div className="w-full px-3 py-2 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="w-full px-3 py-2 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
            ✓ Repository linked successfully!
          </div>
        )}

        <div className="w-full space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Repository URL
          </label>
          <input
            type="text"
            placeholder="https://github.com/username/repo-name"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            disabled={localLoading}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent disabled:bg-gray-100"
          />
          <p className="text-xs text-gray-500">
            Example: https://github.com/yourname/leetcode-solutions
          </p>
        </div>

        <div className="w-full flex flex-col gap-2">
          <Button
            onClick={handleLinkRepo}
            disabled={localLoading || !repoUrl.trim() || isLoading}
          >
            {localLoading ? "Linking..." : "Link Repository"}
          </Button>
          <button
            onClick={handleBackClick}
            disabled={localLoading}
            className="w-full px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50"
          >
            Back
          </button>
        </div>

        <Footer />
      </div>
    </Layout>
  );
};

export default RepoSetupSection;
