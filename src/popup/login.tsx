import { IoLogoGithub } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Footer from "./components/footer";

const LoginSection = () => {
  const navigate = useNavigate();
  return (
     <div className="bg-neutral-200 h-120 gap-y-8 text-5xl flex flex-col items-center justify-center">

          <div className="flex items-center justify-center w-auto">
            <img src="https://www.priyanshuu.tech/_next/image?url=https%3A%2F%2Fi.pinimg.com%2F1200x%2F30%2F56%2F46%2F305646250f1a6dd7411a0f72aa61e2ae.jpg&w=256&q=75" className="rounded-full size-38 object-cover" alt="Logo" width={200} height={200}/>
          </div>

        <div className="px-4 flex flex-col items-center justify-center gap-2">
          <h1 className="text-2xl font-semibold">Authorize with Github</h1>
        <p className="text-center text-sm">
          Before we can push code to GitHub, select any repo you want.
          We need access to your GitHub account
        </p>
        </div>
        <div className="px-4 flex flex-col gap-2">
          <button onClick={() => navigate("/login")} className="cursor-pointer hover:opacity-80 transition-opacity duration-200 ease-in-out active:opacity-60 text-sm bg-black rounded-lg text-white px-6 py-3 flex items-center justify-center gap-3" type="button">
            <IoLogoGithub className="size-6"/>
            Login with Github</button>
          <p className="text-center text-sm text-neutral-500">You can revoke at any time.</p>
        </div>
        <Footer />
    </div>
  )
}

export default LoginSection