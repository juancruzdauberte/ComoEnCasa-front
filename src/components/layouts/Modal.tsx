import type { ReactNode } from "react";
import { modalStore } from "../store/modalStore";
import { orderStore } from "../store/orderStore";
import { X } from "lucide-react";

export const Modal = ({ children }: { children: ReactNode }) => {
  const { setIsOpen } = modalStore();
  const { setOrderSelected } = orderStore();

  const handleBackgroundClick = () => {
    setOrderSelected(null);
    setIsOpen(false);
  };

  return (
    <section
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={handleBackgroundClick}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl w-full mx-4 animate-scale-in"
      >
        {/* Botón de cerrar flotante - OPTIMIZADO */}
        <button
          onClick={handleBackgroundClick}
          className="absolute -top-4 -right-4 z-10 w-10 h-10 bg-black hover:bg-gray-800 
                   text-white rounded-full shadow-xl flex items-center justify-center
                   transition-gpu duration-fast hover:scale-110 hover:rotate-90 group
                   focus-ring gpu-accelerated"
          aria-label="Cerrar modal"
        >
          <X
            size={20}
            className="transition-gpu duration-fast group-hover:scale-110"
          />
        </button>

        {/* Contenido del modal - OPTIMIZADO */}
        <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-300/30 overflow-hidden gpu-accelerated">
          {children}
        </div>

        {/* Decoración - OPTIMIZADO con will-change */}
        <div
          className="absolute -z-10 inset-0 bg-gradient-to-br from-gray-300/20 to-gray-500/20 
                      blur-3xl transform scale-95 pointer-events-none"
          style={{ willChange: "transform" }}
        ></div>
      </div>
    </section>
  );
};
