import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { User } from "../../types/types";
import { Spinner } from "../../common/widget/Spinner";
import { useToken } from "../../hooks/useToken";
import { useUser } from "../../hooks/useAuth";
import { decodeToken } from "../../utils/utilsFunction";

export const AuthSuccess = () => {
  const { setToken } = useToken();
  const { setUser } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    if (token) {
      setToken(token);
      const payload = decodeToken(token);
      if (payload) {
        const user: User = {
          email: payload.email,
          avatar: payload.avatar,
          rol: payload.rol,
        };
        setUser(user);

        navigate(user.rol === "admin" ? "/admin" : "/user");
      }
    }
  }, [location.search, navigate, setToken, setUser]);
  return (
    <section className="min-h-screen flex items-center justify-center">
      <Spinner text="Iniciando sesión..." size={40} />
    </section>
  );
};
