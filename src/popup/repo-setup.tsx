import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { storage } from "../shared/storage";
import Button from "./components/button";
import Footer from "./components/footer";
import Layout from "./components/layout";
import Logo from "./components/logo";
import RoseImage from "./components/rose-image";

const RepoSetupSection = () => {
    const navigate = useNavigate();
    const [repoUrl, setRepourl] = useState<string>();

    const handleSaveRepo = async () => {
        const normalizedRepoUrl = repoUrl?.trim();

        if (normalizedRepoUrl) {
            await storage.set("github_repo", normalizedRepoUrl);
            navigate("/dashboard", { replace: true });
        }
    };

    return (
   <Layout>
            <section className="h-120 w-full flex items-center justify-center px-4">
                <div className="z-10 w-full max-w-md rounded-2xl border border-rose-200/80 bg-white/85 p-6 shadow-[0_20px_60px_-30px_rgba(190,24,93,0.6)] backdrop-blur-sm">
                    <div className="flex flex-col gap-5 items-center text-center">
                        <Logo />

                        <div className="space-y-2">
                            <div className="text-2xl gap-x-1 flex items-center justify-center">
                                <h1 className="font-semibold tracking-tight">Link a</h1>
                                <RoseImage />
                                <b className="text-black/90">Repo</b>
                            </div>
                            <p className="text-sm leading-5 text-neutral-600">
                                Paste your repository URL to connect it with your synced
                                LeetCode submissions.
                            </p>
                        </div>

                        <div className="z-10 flex flex-col items-center justify-center gap-3 w-full">
                            <input
                                id="repo-url"
                                type="url"
                                value={repoUrl ?? ""}
                                onChange={(e) => {
                                    setRepourl(e.target.value);
                                }}
                                placeholder="https://github.com/owner/repo"
                                aria-label="Repository URL"
                                className="w-full rounded-lg border border-rose-300 bg-rose-50/70 px-4 py-2.5 text-sm text-black/80 placeholder-black/45 focus:outline-none focus:ring-2 focus:ring-rose-400"
                            />
                            <Button onClick={async () => await handleSaveRepo()} className="w-full">
                                Link Repository
                            </Button>
                        </div>

                        <p className="text-center text-xs leading-5 text-neutral-500">
                            If authorization fails or expires, you will be redirected home.
                        </p>
                    </div>
                </div>
                <Footer />
            </section>
        </Layout>
    );
};

export default RepoSetupSection;