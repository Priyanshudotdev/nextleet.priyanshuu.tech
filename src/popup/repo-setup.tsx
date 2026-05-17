import { useState } from "react";
import { storage } from "../shared/storage";
import Button from "./components/button";
import Footer from "./components/footer";
import Layout from "./components/layout";
import Logo from "./components/logo";
import RoseImage from "./components/rose-image";

const RepoSetupSection = () => {
  const[repoUrl, setRepourl] = useState<string>();

    return (
     <Layout>
      <div className="h-120 gap-y-8 text-5xl flex flex-col items-center justify-center">
        <Logo />

        <div className="px-4 flex flex-col items-center justify-center gap-4">
          <div className="text-2xl gap-x-1 flex items-center justify-center">
            <h1 className="font-semibold">Link a</h1>
            <RoseImage />
            <b className="text-black/90">Repo</b>
          </div>
        </div>

        <div className="z-10 flex flex-col items-center justify-center gap-4 w-full px-6">
          <input
            id="repo-url"
            type="url"
            value={repoUrl ?? ""}
            onChange={async(e) => {
              setRepourl(e.target.value)
              await storage.set("github_repo", repoUrl);
            }}
            placeholder="Enter repository URL (e.g. https://github.com/owner/repo)"
            aria-label="Repository URL"
            className="w-full rounded-md border-2 border-rose-600 bg-rose-50 px-4 py-2 text-sm text-black/80 placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-rose-300"
          />
        <Button className="px-4">
          Link Repository
        </Button>
        </div>

        <p className="text-center text-sm text-neutral-500 px-6">
          If authorization fails or expires, you will be redirected to home.
        </p>

        <Footer />
      </div>
    </Layout>
  )
}

export default RepoSetupSection
