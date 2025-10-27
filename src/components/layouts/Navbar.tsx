import { Link, NavLink } from "react-router-dom";
import { logOut } from "../services/auth.service";
import { useUser } from "../hooks/useAuth";
import { IoIosLogOut } from "react-icons/io";
import { Package, ShoppingCart, DollarSign } from "lucide-react";
import { useState, useMemo } from "react";

export const Navbar = () => {
  const { setUser } = useUser();
  const [isHovered, setIsHovered] = useState(false);

  const handleLogout = async () => {
    setUser(null);
    await logOut();
  };

  // OPTIMIZACIÓN: Memoizar navItems para evitar re-renders
  const navItems = useMemo(
    () => [
      {
        to: "/admin",
        icon: <ShoppingCart size={24} />,
        label: "Pedidos",
        end: true,
      },
      {
        to: "/admin/product",
        icon: <Package size={24} />,
        label: "Productos",
        end: true,
      },
      {
        to: "/admin/finance",
        icon: <DollarSign size={24} />,
        label: "Finanzas",
        end: true,
      },
    ],
    []
  );

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-black shadow-2xl z-50 
                 transition-gpu duration-200
                 ${isHovered ? "w-64" : "w-20"}
                 gpu-accelerated`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <nav className="flex flex-col h-full py-6">
        {/* Logo - OPTIMIZADO */}
        <Link
          to="/admin"
          className="flex items-center gap-3 px-3 mb-8 group relative overflow-hidden"
        >
          <div className="relative z-10 flex-shrink-0 py-0.5">
            <img
              src="https://res.cloudinary.com/dttpgbmdx/image/upload/v1749124735/LogoComoEnCasaRedondo_gwhyxu.png"
              alt="logo"
              loading="lazy"
              className="w-12 h-12 border border-1 border-white rounded-full transition-gpu duration-fast img-optimized"
            />
          </div>

          <div
            className={`relative z-10 overflow-hidden transition-gpu duration-200 
                       ${isHovered ? "opacity-100 w-auto" : "opacity-0 w-0"}`}
          >
            <p
              className="text-lg font-bold text-white whitespace-nowrap 
                        group-hover:text-gray-300 transition-colors duration-fast"
            >
              Como En Casa
            </p>
          </div>

          {/* Efecto de hover - OPTIMIZADO */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-gray-700 to-transparent 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-fast"
          ></div>
        </Link>

        {/* Separador */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mx-4 mb-6"></div>

        {/* Navigation Items - OPTIMIZADO */}
        <ul className="flex-1 flex flex-col gap-2 px-3">
          {navItems.map((item, index) => (
            <li
              key={item.to}
              className="animate-slide-in-left"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-3 rounded-xl 
                   transition-gpu duration-fast group relative overflow-hidden
                   focus-ring gpu-accelerated
                   ${
                     isActive
                       ? "bg-white text-black shadow-lg shadow-gray-600/30"
                       : "text-gray-300 hover:bg-gray-800 hover:text-white"
                   }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div
                      className={`flex-shrink-0 transition-gpu duration-fast
                                ${
                                  isActive
                                    ? "scale-110"
                                    : "group-hover:scale-110"
                                }`}
                    >
                      {item.icon}
                    </div>

                    {/* Label */}
                    <span
                      className={`font-semibold whitespace-nowrap transition-gpu duration-200
                                ${
                                  isHovered
                                    ? "opacity-100 w-auto"
                                    : "opacity-0 w-0"
                                }`}
                    >
                      {item.label}
                    </span>

                    {/* Efecto de brillo en hover - OPTIMIZADO */}
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                                  opacity-0 group-hover:opacity-100 
                                  transform -translate-x-full group-hover:translate-x-full 
                                  transition-transform duration-700 pointer-events-none"
                    ></div>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Separador inferior */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mx-4 mb-4"></div>

        {/* Logout Button - OPTIMIZADO */}
        <div className="px-3">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 text-white bg-gray-800 hover:bg-red-600 
                     rounded-xl transition-gpu duration-fast group relative overflow-hidden 
                     shadow-lg hover:shadow-red-600/50 focus-ring gpu-accelerated"
          >
            {/* Icono */}
            <div className="flex-shrink-0 transform group-hover:rotate-12 transition-gpu duration-fast">
              <IoIosLogOut size={24} />
            </div>

            {/* Label */}
            <span
              className={`font-semibold whitespace-nowrap transition-gpu duration-200
                        ${isHovered ? "opacity-100 w-auto" : "opacity-0 w-0"}`}
            >
              Cerrar sesión
            </span>

            {/* Efecto de pulso en hover - OPTIMIZADO */}
            <div
              className="absolute inset-0 bg-red-500 opacity-0 group-hover:opacity-20 
                          transition-opacity duration-fast rounded-xl"
            ></div>
          </button>
        </div>

        {/* Indicador de estado - OPTIMIZADO */}
        <div className="px-5 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span
              className={`text-xs text-gray-500 whitespace-nowrap transition-gpu duration-200
                        ${isHovered ? "opacity-100 w-auto" : "opacity-0 w-0"}`}
            >
              Sistema activo
            </span>
          </div>
        </div>
      </nav>
    </aside>
  );
};
