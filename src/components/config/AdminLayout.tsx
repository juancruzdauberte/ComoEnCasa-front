import { Outlet } from "react-router-dom";
import { Navbar } from "../layouts/Navbar";

export const AdminLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
