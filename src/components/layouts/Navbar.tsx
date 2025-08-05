import { Link } from "react-router-dom";
import { logOut } from "../services/auth.service";
import { useUser } from "../hooks/useAuth";
import { IoIosLogOut } from "react-icons/io";

export const Navbar = () => {
  const { setUser } = useUser();

  const handleLogout = async () => {
    setUser(null);
    await logOut();
  };

  return (
    <header className="w-full backdrop-blur-sm bg-slate-500 shadow-md">
      <nav className="flex justify-between items-center px-5">
        <Link to="/admin" className="flex items-center gap-2">
          <picture>
            <img
              src="https://res.cloudinary.com/dttpgbmdx/image/upload/v1749124735/LogoComoEnCasaRedondo_gwhyxu.png"
              alt="logo"
              loading="lazy"
              className="h-16 "
            />
          </picture>

          <p className="text-2xl font-semibold text-white hover:underline">
            Como En Casa
          </p>
        </Link>

        <ul>
          <li>
            <button
              onClick={handleLogout}
              className="text-white bg-red-600 px-2 text-lg rounded-md flex gap-1 items-center font-semibold"
            >
              <IoIosLogOut size={25} />
              Cerrar sesión
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};
