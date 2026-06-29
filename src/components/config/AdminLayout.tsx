import { Outlet } from "react-router-dom";
import { Navbar } from "../layouts/Navbar";

export const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#FFFFFF]">
      <Navbar />
      <main className="flex-1 transition-all duration-500 md:ml-20 pb-16 md:pb-0">
        <Outlet />
      </main>
    </div>
  );
};
