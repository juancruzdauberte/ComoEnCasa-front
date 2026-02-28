import { Outlet } from "react-router-dom";
import { Navbar } from "../layouts/Navbar";
import { useUser } from "../hooks/useAuth";

export const AdminLayout = () => {
  const { viewMode } = useUser();

  return (
    <div className="flex min-h-screen bg-[#FFFFFF]">
      {viewMode === "admin" && <Navbar />}
      <main
        className={`flex-1 transition-all duration-500 ${
          viewMode === "admin" ? "ml-20" : "ml-0"
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
};
