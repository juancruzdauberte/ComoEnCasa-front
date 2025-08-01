import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../hooks/useAuth";

export const ProtectedRoutes = ({ role }: { role: string }) => {
  const { user, loading } = useUser();

  if (loading) return <p>Cargnado..</p>;
  if (!user) return <Navigate to="/login" replace />;
  if (user.rol !== role) return <Navigate to="/unhautorized" replace />;

  return <Outlet />;
};
