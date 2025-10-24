import { Link, NavLink } from "react-router-dom";
import { logOut } from "../services/auth.service";
import { useUser } from "../hooks/useAuth";
import { IoIosLogOut } from "react-icons/io";
import { Package, ShoppingCart, DollarSign } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  const { setUser } = useUser();
  const [isHovered, setIsHovered] = useState(false);

  const handleLogout = async () => {
    setUser(null);
    await logOut();
  };

  const navItems = [
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
  ];

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-[#000000] shadow-2xl z-50 transition-all duration-200 ease-in-out ${
        isHovered ? "w-64" : "w-20"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <nav className="flex flex-col h-full py-6">
        {/* Logo */}
        <Link
          to="/admin"
          className="flex items-center gap-3 px-5 mb-8 group relative overflow-hidden"
        >
          <div className="relative z-10 flex-shrink-0 py-0.5">
            <img
              src="https://res.cloudinary.com/dttpgbmdx/image/upload/v1749124735/LogoComoEnCasaRedondo_gwhyxu.png"
              alt="logo"
              loading="lazy"
              className="h-12 w-12 rounded-full ring-1 ring-[#757575] group-hover:ring-[#BDBDBD] transition-all duration-300 group-hover:scale-105"
            />
          </div>

          <div
            className={`relative z-10 overflow-hidden transition-all duration-500 ${
              isHovered ? "opacity-100 w-auto" : "opacity-0 w-0"
            }`}
          >
            <p className="text-lg font-bold text-[#FFFFFF] whitespace-nowrap group-hover:text-[#BDBDBD] transition-colors duration-300">
              Como En Casa
            </p>
          </div>

          {/* Efecto de hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#424242] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Link>

        {/* Separador */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#757575] to-transparent mx-4 mb-6"></div>

        {/* Navigation Items */}
        <ul className="flex-1 flex flex-col gap-2 px-3">
          {navItems.map((item, index) => (
            <li
              key={item.to + item.label}
              className="animate-slide-in-left"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                    isActive
                      ? "bg-[#FFFFFF] text-[#000000] shadow-lg shadow-[#757575]/30"
                      : "text-[#BDBDBD] hover:bg-[#424242] hover:text-[#FFFFFF]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div
                      className={`flex-shrink-0 transition-transform duration-300 ${
                        isActive ? "scale-110" : "group-hover:scale-110"
                      }`}
                    >
                      {item.icon}
                    </div>

                    {/* Label */}
                    <span
                      className={`font-semibold whitespace-nowrap transition-all duration-500 ${
                        isHovered ? "opacity-100 w-auto" : "opacity-0 w-0"
                      }`}
                    >
                      {item.label}
                    </span>

                    {/* Efecto de brillo en hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-700"></div>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Separador inferior */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#757575] to-transparent mx-4 mb-4"></div>

        {/* Logout Button */}
        <div className="px-3">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 text-[#FFFFFF] bg-[#424242] hover:bg-red-600 
                     rounded-xl transition-all duration-300 group relative overflow-hidden shadow-lg hover:shadow-red-600/50"
          >
            {/* Icono */}
            <div className="flex-shrink-0 transform group-hover:rotate-12 transition-transform duration-300">
              <IoIosLogOut size={24} />
            </div>

            {/* Label */}
            <span
              className={`font-semibold whitespace-nowrap transition-all duration-500 ${
                isHovered ? "opacity-100 w-auto" : "opacity-0 w-0"
              }`}
            >
              Cerrar sesión
            </span>

            {/* Efecto de pulso en hover */}
            <div className="absolute inset-0 bg-red-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl"></div>
          </button>
        </div>

        {/* Indicador de estado */}
        <div className="px-5 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span
              className={`text-xs text-[#757575] whitespace-nowrap transition-all duration-500 ${
                isHovered ? "opacity-100 w-auto" : "opacity-0 w-0"
              }`}
            >
              Sistema activo
            </span>
          </div>
        </div>
      </nav>

      <style>{`
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </aside>
  );
};
