import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const BtnCreateOrder = ({ btnClassname }: { btnClassname: string }) => {
  const navigate = useNavigate();
  return (
    <div className="pt-4 animate-scale-in" style={{ animationDelay: "0.4s" }}>
      <button onClick={() => navigate("/admin/order")} className={btnClassname}>
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#000000] via-[#424242] to-[#000000] 
                             opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        ></div>

        {/* Contenido */}
        <div className="relative z-10 flex items-center gap-3 group-hover:text-[#FFFFFF] transition-colors duration-300">
          <PlusCircle className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" />
          <span className="text-lg">Crear Nuevo Pedido</span>
        </div>

        {/* Efecto de brillo */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                             opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full 
                             transition-all duration-1000"
        ></div>

        {/* Borde inferior animado */}
        <div
          className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#000000] via-[#757575] to-[#000000] 
                             transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
        ></div>
      </button>
    </div>
  );
};
