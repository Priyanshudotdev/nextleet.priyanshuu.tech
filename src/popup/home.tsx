import { useNavigate } from "react-router-dom";
import Button from "./components/button";
import Footer from "./components/footer";
import Layout from "./components/layout";
import Logo from "./components/logo";
import RoseImage from "./components/rose-image";

export const Home = () => {
    const navigate = useNavigate();

    return (
      <Layout>
            <section className="h-120 w-full flex items-center justify-center px-4">
                    <div className="flex flex-col items-center gap-5 text-center">
                        <Logo />

                        <div className="space-y-2">
                            <div className="text-2xl gap-x-1 flex items-center justify-center">
                                <h1 className="font-semibold tracking-tight">Welcome to</h1>
                                <RoseImage />
                                <b className="text-black/90">NextLeet</b>
                            </div>
                            <p className="text-center leading-5 text-neutral-600 text-sm">
                                NextLeet is a Chrome extension that syncs your LeetCode
                                submissions to GitHub.
                                <br />
                                Set it up now.
                            </p>
                        </div>

                        <div className="w-full space-y-2 z-10">
                            <Button onClick={() => navigate("/login")} className="w-full">
                                Complete Setup
                            </Button>
                            <p className="text-center text-sm text-neutral-500">
                                It will take less than 2 min
                            </p>
                        </div>
                    </div>
                <Footer />
            </section>
        </Layout>
    );
};
