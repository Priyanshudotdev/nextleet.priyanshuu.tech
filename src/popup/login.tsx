import { useCallback, useEffect, useState } from "react";
import { IoLogoGithub } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { storage } from "../shared/storage";
import { useAuth } from "../shared/use-auth";
import Button from "./components/button";
import Footer from "./components/footer";
import Layout from "./components/layout";
import Logo from "./components/logo";
import RoseImage from "./components/rose-image";

const LoginSection = () => {
  const totalSteps = 3;
  const currentStep = 1;
  const navigate = useNavigate();
  const { login, setAuthStatus, setAuthError, isLoading, error } = useAuth();

  const [userCode, setUserCode] = useState<string>("");
  const [localStatus, setLocalStatus] = useState<string>();

  const handleConnectGithub = useCallback(async () => {
    chrome.runtime.sendMessage({ type: "INITIATE_AUTH" }, (response) => {
      if (!response || !response.user_code) {
        setLocalStatus("error");
        setAuthError("Failed to initiate GitHub authentication");
        return;
      }

      setUserCode(response.user_code);
      setLocalStatus("pending");
      setAuthStatus("pending");
    });
  }, [setAuthStatus, setAuthError]);

  const handleAuthCompletion = useCallback(
    async (token: string) => {
      try {
        await login(token);
        setLocalStatus("completed");
        navigate("/repo-setup", { replace: true });
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Authentication failed";
        setLocalStatus("failed");
        setAuthError(errorMessage);
        console.error("Login error:", err);
      }
    },
    [login, navigate, setAuthError]
  );

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const authState = await storage.get("auth_state");
        const state = authState ? JSON.parse(authState) : null;

        if (state?.status === "pending") {
          setUserCode(state.user_code);
          setLocalStatus("pending");
          setAuthStatus("pending");
        }

        if (state?.status === "completed" && state?.token) {
          setLocalStatus("completed");
          await handleAuthCompletion(state.token);
        }
      } catch (err) {
        console.error("Failed to check auth state:", err);
        setAuthError("Failed to check authentication state");
      }
    };

    checkAuthState();
  }, [setAuthStatus, setAuthError, handleAuthCompletion]);

  return (
    <Layout>
      <div className="h-120 gap-y-8 text-5xl flex flex-col items-center justify-center">
        <div className="flex flex-col gap-y-2 items-center justify-center">
          <Logo />
          <p className="text-sm tracking-tight">
            Step {currentStep} / {totalSteps}
          </p>
        </div>

        <div className="px-4 flex flex-col items-center justify-center gap-2">
          <div className="text-2xl gap-x-1 flex items-center justify-center">
            <h1 className="font-semibold">Authorize with</h1>
            <RoseImage />
            <b className="text-black/90">Github</b>
          </div>
          <p className="text-center leading-4 text-[#71717A] text-sm">
            Before we can push code to GitHub, select any repo you want. We need access
            to your GitHub account
          </p>
        </div>

        {userCode && (
          <div className="text-center">
            <p className="text-sm font-mono bg-gray-100 px-3 py-2 rounded text-gray-700">
              {userCode}
            </p>
          </div>
        )}

        {error && (
          <div className="px-4 py-2 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="px-4 flex flex-col gap-1">
          <Button
            onClick={() => handleConnectGithub()}
            disabled={isLoading || localStatus === "pending"}
            className="flex items-center text-sm justify-center gap-x-2 px-4"
          >
            {isLoading ? (
              <>
                <span className="animate-spin">⌛</span>
                Connecting...
              </>
            ) : (
              <>
                <IoLogoGithub className="size-6" />
                Login with Github
              </>
            )}
          </Button>
          <p className="text-center text-sm text-neutral-500">
            You can revoke at any time.
          </p>
        </div>
        <Footer />
      </div>
    </Layout>
  );
};

export default LoginSection;
