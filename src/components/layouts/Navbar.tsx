import { Link } from "react-router-dom";
import { logOut } from "../services/auth.service";
import { useUser } from "../hooks/useAuth";

export const Navbar = () => {
  const { setUser } = useUser();

  const handleLogout = async () => {
    setUser(null);
    await logOut();
  };

  return (
    <header>
      <nav className="flex justify-between items-center ">
        <Link to="/admin">
          <picture>
            <img
              src="https://res.cloudinary.com/dttpgbmdx/image/upload/v1749124735/LogoComoEnCasaRedondo_gwhyxu.png"
              alt="logo"
              loading="lazy"
              className="h-16"
            />
          </picture>
        </Link>

        <ul>
          <li>
            <button onClick={handleLogout} className="text-red-500">
              Cerrar sesion
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};
