import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="pt-12 px-6">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
