import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const MainLayout = () => {
  return (
    <main>
      <Navbar />
      <main className="flex justify-center items-center pt-25 px-6 ">
        <div className="w-full lg:w-[60%]">
          <Outlet />
        </div>
      </main>
    </main>
  );
};

export default MainLayout;
