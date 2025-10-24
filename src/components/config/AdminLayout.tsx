import { Outlet } from "react-router-dom";
import { Navbar } from "../layouts/Navbar";

export const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#FFFFFF]">
      <Navbar />
      <main className="flex-1 ml-20 transition-all duration-500">
        <Outlet />
      </main>
    </div>
  );
};
