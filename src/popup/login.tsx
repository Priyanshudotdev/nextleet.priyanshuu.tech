import { useEffect, useState } from "react";
import { IoLogoGithub } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { storage } from "../shared/storage";
import Button from "./components/button";
import Footer from "./components/footer";
import Layout from "./components/layout";
import Logo from "./components/logo";
import RoseImage from "./components/rose-image";

const LoginSection = () => {
  const totalSteps = 3;
  const currentStep = 1;
  const navigate = useNavigate();

  const [userCode, setUserCode] = useState<string>("");
  const [authStatus, setAuthStatus] = useState<string>();

  const handleConnectGithub = () => {
    chrome.runtime.sendMessage({ type: "INITIATE_AUTH" }, async (response) => {
      if (response?.user_code) {
        await storage.set("auth_state", {
          user_code: response.user_code,
          device_code: response.device_code,
          status: "pending",
        });
        setUserCode(response.user_code);
        setAuthStatus("pending");
        navigate("/pending", { replace: true });
      }
    });
  };

  useEffect(() => {
    const checkAuthState = async () => {
      const state = await storage.get<{ status?: string; user_code?: string }>(
        "auth_state"
      );

      if (state?.status === "pending") {
        setUserCode(state.user_code ?? "");
        setAuthStatus("pending");
        navigate("/pending", { replace: true });
      }

      if (state?.status === "completed") {
        setAuthStatus("completed");
        navigate("/dashboard", { replace: true });
      }
    };
    checkAuthState();
  }, [navigate]);

  // chrome.runtime.onMessage.addListener({
  //   type: ""
  // })

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

        <p className="text-sm">
          {userCode}
          <br />
          {authStatus}
        </p>

        <div className="px-4 flex flex-col gap-1">
          <Button
            onClick={() => handleConnectGithub()}
            className="flex items-center text-sm justify-center gap-x-2 px-4"
          >
            <IoLogoGithub className="size-6" />
            Login with Github
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
