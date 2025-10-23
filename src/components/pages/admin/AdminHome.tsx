import { OrderLayout } from "../../layouts/OrderLayout";
import { Modal } from "../../layouts/Modal";
import { OrderModal } from "../../common/OrderModal";
import { modalStore } from "../../store/modalStore";
import { useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";

export const AdminHome = () => {
  const { isOpen } = modalStore();
  const navigate = useNavigate();
  
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header con gradiente y sombra */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 pt-16 pb-24">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="relative container mx-auto px-6">
          <div className="text-center space-y-6 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-2xl">
              Panel Administrativo
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Gestiona pedidos, productos y finanzas desde un solo lugar
            </p>
            
            <button
              onClick={() => navigate("/admin/order")}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-indigo-600 font-semibold rounded-2xl 
                         shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105 hover:-translate-y-1
                         overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
              <PlusCircle className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
              <span className="text-lg">Crear Nuevo Pedido</span>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </button>
          </div>
        </div>

        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C300,100 900,100 1200,0 L1200,120 L0,120 Z" 
                  className="fill-slate-50"></path>
          </svg>
        </div>
      </div>

      {/* Content */}
      <section className="container mx-auto px-6 -mt-12 pb-12">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-slate-200/60 backdrop-blur-xl 
                        transform transition-all duration-500 hover:shadow-indigo-500/20">
          <OrderLayout />
        </div>
      </section>

      {isOpen && (
        <Modal>
          <OrderModal />
        </Modal>
      )}

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </section>
  );
};
