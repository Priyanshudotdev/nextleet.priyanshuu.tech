import { useNavigate } from "react-router-dom";
import Footer from "./components/footer";
import Layout from "./components/layout";
import Logo from "./components/logo";
import Button from "./components/button";
import RoseImage from "./components/rose-image";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="h-120 gap-y-8 text-5xl flex flex-col items-center justify-center">
        <Logo />
        <div className="px-4 flex flex-col items-center justify-center gap-2">
          <div className="text-2xl gap-x-1 flex items-center justify-center">
            <h1 className="font-semibold">Welcome to</h1>
            <RoseImage />
            <b className="text-black/90">NextLeet</b>
          </div>
          <p className="text-center leading-4 text-[#71717A] text-sm">
            NextLeet is a Chrome extension that syncs your LeetCode submissions to
            GitHub. <br />
            Set it up now
          </p>
        </div>
        <div className="px-4 flex flex-col gap-1">
          <Button onClick={() => navigate("/login")}>Complete Setup</Button>
          <p className="text-center text-sm text-neutral-500">
            {" "}
            It will take less than 2 min
          </p>
        </div>
        <Footer />
      </div>
    </Layout>
  );
};
