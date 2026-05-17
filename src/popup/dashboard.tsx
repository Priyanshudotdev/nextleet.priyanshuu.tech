import Footer from "./components/footer";
import Layout from "./components/layout";
import Logo from "./components/logo";
import RoseImage from "./components/rose-image";

export const Dashboard = () => {
  return (
    <Layout>
      <div className="h-120 gap-y-8 text-5xl flex flex-col items-center justify-center">
        <Logo />
        <div className="px-4 flex flex-col items-center justify-center gap-2">
          <div className="text-2xl gap-x-1 flex items-center justify-center">
            <h1 className="font-semibold">Welcome to</h1>
            <RoseImage />
            <b className="text-black/90">Dashboard</b>
          </div>
        <Footer />
      </div>
      </div>
    </Layout>
  );
};
