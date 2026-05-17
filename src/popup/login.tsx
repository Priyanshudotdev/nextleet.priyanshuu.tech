import { IoLogoGithub } from "react-icons/io";
import Button from "./components/button";
import Footer from "./components/footer";
import Layout from "./components/layout";
import Logo from "./components/logo";
import RoseImage from "./components/rose-image";

const LoginSection = () => {
  const totalSteps = 3;
  const currentStep = 1;
  return (
     <Layout>
     <div className="h-120 gap-y-8 text-5xl flex flex-col items-center justify-center">
          <div className="flex flex-col gap-y-2 items-center justify-center">
            <Logo />
            <p className="text-sm tracking-tight">Step {currentStep} / {totalSteps}</p>
          </div>

        <div className="px-4 flex flex-col items-center justify-center gap-2">
           <div className="text-2xl gap-x-1 flex items-center justify-center">
              <h1 className="font-semibold">Authorize with</h1>
              <RoseImage />
              <b className="text-black/90">Github</b>
            </div>
        <p className="text-center leading-4 text-[#71717A] text-sm">
          Before we can push code to GitHub, select any repo you want.
          We need access to your GitHub account
        </p>
        </div>
        <div className="px-4 flex flex-col gap-1">
          <Button className="flex items-center text-sm justify-center gap-x-2 px-4">
            <IoLogoGithub className="size-6"/>
            Login with Github
          </Button>
          <p className="text-center text-sm text-neutral-500">You can revoke at any time.</p>
        </div>
        <Footer />
    </div>
     </Layout>
  )
}

export default LoginSection