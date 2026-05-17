import { useNavigate } from "react-router-dom";
import Footer from "./components/footer";

export const Home = () => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-neutral-200 h-120 gap-y-8 text-5xl flex flex-col items-center justify-center">

        <div className="flex items-center justify-center w-auto">
            <img src="https://www.priyanshuu.tech/_next/image?url=https%3A%2F%2Fi.pinimg.com%2F1200x%2F30%2F56%2F46%2F305646250f1a6dd7411a0f72aa61e2ae.jpg&w=256&q=75" className="rounded-full size-38 object-cover" alt="Logo" width={200} height={200}/>
          </div>

        <div className="px-4 flex flex-col items-center justify-center gap-2">
          <h1 className="text-2xl font-semibold">Welcome to <b>NextLeet</b></h1>
        <p className="text-center text-sm">
          LeetNext is a Chrome extension that syncs your LeetCode submissions to GitHub. <br />
          Set it up now
        </p>
        </div>

        <div className="px-4 flex flex-col gap-2">
          <button onClick={() => navigate("/login")} className="cursor-pointer hover:opacity-80 transition-opacity duration-200 ease-in-out active:opacity-60 text-sm bg-black rounded-lg text-white px-4 py-2" type="button">Complete Setup</button>
          <p className="text-center text-sm text-neutral-500">It will take less than 2 min</p>
        </div>
        <Footer />
    </div>
  );
};