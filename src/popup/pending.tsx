import { useNavigate } from "react-router-dom";
import Footer from "./components/footer";
import Layout from "./components/layout";
import Logo from "./components/logo";
import Button from "./components/button";
import { useAuth } from "../shared/use-auth";

export const PendingPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleRetry = () => {
    navigate("/login", { replace: true });
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <Layout>
      <div className="h-120 gap-y-6 text-5xl flex flex-col items-center justify-center px-4">
        <Logo />
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center">
            <span className="text-2xl">⏳</span>
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-semibold mb-2">Setup in Progress</h1>
            <p className="text-center leading-5 text-[#71717A] text-sm">
              Your authentication is incomplete. Please complete the setup process to continue.
            </p>
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <Button onClick={handleRetry}>Continue Setup</Button>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
          >
            Start Over
          </button>
        </div>
        <Footer />
      </div>
    </Layout>
  );
};
