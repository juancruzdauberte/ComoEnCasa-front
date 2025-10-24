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
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000]/60 backdrop-blur-sm
               animate-fade-in"
      onClick={handleBackgroundClick}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl w-full mx-4 animate-scale-in"
      >
        {/* Botón de cerrar flotante */}
        <button
          onClick={handleBackgroundClick}
          className="absolute -top-4 -right-4 z-10 w-10 h-10 bg-[#000000] hover:bg-[#424242] 
                   text-[#FFFFFF] rounded-full shadow-xl flex items-center justify-center
                   transition-all duration-300 hover:scale-110 hover:rotate-90 group"
          aria-label="Cerrar modal"
        >
          <X size={20} className="group-hover:scale-110 transition-transform duration-300" />
        </button>

        {/* Contenido del modal */}
        <div className="bg-[#FFFFFF] rounded-2xl shadow-2xl border-2 border-[#BDBDBD]/30 overflow-hidden">
          {children}
        </div>

        {/* Decoración */}
        <div className="absolute -z-10 inset-0 bg-gradient-to-br from-[#BDBDBD]/20 to-[#757575]/20 
                      blur-3xl transform scale-95"></div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </section>
  );
};
