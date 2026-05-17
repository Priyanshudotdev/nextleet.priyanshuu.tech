import { useEffect, useState } from "react"
import { BiCopy } from "react-icons/bi"
import { toast } from "sonner"
import { storage } from "../shared/storage"
import Button from "./components/button"
import Footer from "./components/footer"
import Layout from "./components/layout"
import Logo from "./components/logo"
import RoseImage from "./components/rose-image"

const PendingSection = () => {
    const [userCode, setUserCode] = useState<string>()

    useEffect(() => {
        const loadUserCode = async () => {
            const state = await storage.get<{ status?: string; user_code?: string }>(
                "auth_state"
            );
            setUserCode(state?.user_code);
        };

        loadUserCode();

        const pollInterval = setInterval(async () => {
            const state = await storage.get<{ status?: string }>(
                "auth_state"
            );
            if (state?.status === "completed") {
                window.location.hash = "#/dashboard";
                clearInterval(pollInterval);
            }
            if (state?.status === "failed") {
                window.location.hash = "#/";
                clearInterval(pollInterval);
            }
        }, 1000);

        return () => clearInterval(pollInterval);
    }, [])

    return (
     <Layout>
      <div className="h-120 gap-y-8 text-5xl flex flex-col items-center justify-center">
        <Logo />

        <div className="px-4 flex flex-col items-center justify-center gap-4">
          <div className="text-2xl gap-x-1 flex items-center justify-center">
            <h1 className="font-semibold">Authorization</h1>
            <RoseImage />
            <b className="text-black/90">Pending</b>
          </div>

          <Button
            onClick={async () => {
              if (userCode) {
                await navigator.clipboard.writeText(userCode);
                toast.success("Code Copied!!");
              }
            }}
            type="button"
            variant="outline"
            aria-label="Copy authorization code"
            className="z-10"
          >
            <p className="text-2xl font-semibold tracking-wider text-neutral-900">
              {userCode ? userCode : "Loading..."}
            </p>

            <span className="flex h-10 w-10 items-center justify-center rounded-full text-rose-600 transition-colors duration-200">
              <BiCopy className="size-5" />
            </span>
          </Button>

          {
            userCode ? (
              <p className="text-center leading-4 text-[#71717A] text-sm">
            Click on the code to copy it
            <br /> 
            Enter this code into the Github Auth Tab
          </p>
            ): (
              <p className="text-center leading-4 text-[#71717A] text-sm">Please wait your code is generating.</p>
            )
          }
        </div>

        <p className="text-center text-sm text-neutral-500 px-6">
          If authorization fails or expires, you will be redirected to home.
        </p>

        <Footer />
      </div>
    </Layout>
  )
}

export default PendingSection
