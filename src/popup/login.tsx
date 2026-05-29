import { IoLogoGithub } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Button from "./components/button";
import Footer from "./components/footer";
import Layout from "./components/layout";
import Logo from "./components/logo";
import RoseImage from "./components/rose-image";

const LoginSection = () => {
    const totalSteps = 3;
    const currentStep = 1;
    const navigate = useNavigate();

    const handleConnectGithub = () => {
        navigate("/pending");
    };

    return (
        <Layout>
            <section className="h-120 w-full flex items-center justify-center px-4">
                    <div className="flex flex-col gap-5 items-center text-center">
                        <div className="flex flex-col gap-y-2 items-center justify-center">
                            <Logo />
                            <p className="text-sm tracking-tight text-neutral-600">
                                Step {currentStep} / {totalSteps}
                            </p>
                        </div>

                        <div className="space-y-2">
                            <div className="text-2xl gap-x-1 flex items-center justify-center">
                                <h1 className="font-semibold tracking-tight">Authorize with</h1>
                                <RoseImage />
                                <b className="text-black/90">Github</b>
                            </div>
                            <p className="text-center leading-5 text-neutral-600 text-sm">
                                Before we can push code to GitHub, select any repo you want.
                                We need access to your GitHub account.
                            </p>
                        </div>

                        <div className="w-full flex flex-col gap-2">
                            <Button
                                onClick={handleConnectGithub}
                                className="w-full flex items-center text-sm justify-center gap-x-2 px-4"
                            >
                                <IoLogoGithub className="size-6" />
                                Login with Github
                            </Button>
                            <p className="text-center text-sm text-neutral-500">
                                You can revoke at any time.
                            </p>
                        </div>
                    </div>
                <Footer />
            </section>
        </Layout>
    );
};

export default LoginSection;
