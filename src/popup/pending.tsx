import { useEffect, useState } from "react";
import { BiCopy } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { storage } from "../shared/storage";
import Button from "./components/button";
import Footer from "./components/footer";
import Layout from "./components/layout";
import Logo from "./components/logo";
import RoseImage from "./components/rose-image";

const PendingSection = () => {
    const navigate = useNavigate();
    const [userCode, setUserCode] = useState<string>();

    useEffect(() => {
        let isUnmounted = false;

        const bootstrapPendingAuth = async () => {
            const state = await storage.get<{ status?: string; user_code?: string }>("auth_state");

            if (state?.status === "completed") {
                navigate("/dashboard", { replace: true });
                return;
            }

            if (state?.status === "pending" && state.user_code) {
                setUserCode(state.user_code);
                return;
            }

            chrome.runtime.sendMessage({ type: "INITIATE_AUTH" }, async (response) => {
                if (isUnmounted) {
                    return;
                }

                if (chrome.runtime.lastError) {
                    toast.error("Could not start GitHub auth. Please try again.");
                    await storage.set("auth_state", { status: "failed" });
                    navigate("/", { replace: true });
                    return;
                }

                if (response?.user_code) {
                    setUserCode(response.user_code);
                    return;
                }

                toast.error("Failed to fetch authorization code.");
                await storage.set("auth_state", { status: "failed" });
                navigate("/", { replace: true });
            });
        };

        bootstrapPendingAuth();

        const pollInterval = setInterval(async () => {
            const state = await storage.get<{ status?: string }>("auth_state");
            if (state?.status === "completed") {
                navigate("/dashboard", { replace: true });
                clearInterval(pollInterval);
            }
            if (state?.status === "failed") {
                navigate("/", { replace: true });
                clearInterval(pollInterval);
            }
        }, 1000);

        return () => {
            isUnmounted = true;
            clearInterval(pollInterval);
        };
    }, [navigate]);

    const handleCopyCode = async () => {
        if (!userCode) {
            return;
        }

        await navigator.clipboard.writeText(userCode);
        toast.success("Code copied");
    };

    const handleEnterCode = async () => {
        if (userCode) {
            await navigator.clipboard.writeText(userCode);
            toast.success("Code copied. Paste it in GitHub.");
        }
        window.open("https://github.com/login/device", "_blank", "noopener,noreferrer");
    };

    return (
        <Layout>
            <section className="h-120 w-full flex items-center justify-center px-4">
                    <div className="flex flex-col items-center gap-4 text-center">
                        <Logo />

                        <div className="flex items-center justify-center gap-2 text-2xl">
                            <h1 className="font-semibold tracking-tight">Authorization</h1>
                            <RoseImage />
                            <b className="text-black/90">Pending</b>
                        </div>

                        <p className="text-sm font-medium text-neutral-700">
                            Enter this code on GitHub to complete verification.
                        </p>

                        <Button
                            onClick={handleCopyCode}
                            type="button"
                            variant="outline"
                            aria-label="Copy authorization code"
                            className="z-10"
                        >
                            <span className="flex w-full items-center justify-center gap-x-2 text-rose-600 transition-colors duration-200">
                                <p className="text-2xl font-semibold tracking-tight text-rose-500">
                                    {userCode}
                                </p>
                                <BiCopy className="size-5" />
                            </span>
                        </Button>

                        <Button onClick={handleEnterCode} className="w-full">
                            Open Github to Verify
                        </Button>

                        <p className="text-center text-xs leading-5 text-neutral-500">
                            If authorization fails or expires, you will be redirected home.
                        </p>
                    </div>
                <Footer />
            </section>
        </Layout>
    );
};

export default PendingSection;
