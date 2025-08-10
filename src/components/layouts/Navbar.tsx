import { Link, NavLink } from "react-router-dom";
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
    <header className="w-full backdrop-blur-sm bg-slate-700 shadow-md">
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

        <ul className="flex items-center gap-3">
          <li className=" hover:underline">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-white text-black px-2 font-semibold rounded-md"
                  : "text-white"
              }
              end
              to="/admin/product"
            >
              Productos
            </NavLink>
          </li>
          <li className="hover:underline">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-white text-black px-2 font-semibold rounded-md"
                  : "text-white hover:underline"
              }
              end
              to="/admin"
            >
              Pedidos
            </NavLink>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="text-white bg-red-600 hover:bg-red-700 px-2 text-lg rounded-md flex gap-1 items-center font-semibold"
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
