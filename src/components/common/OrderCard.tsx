import { useOrder } from "../hooks/useOrder";
import { formattedAmount } from "../utils/utilsFunction";
import { BtnPayOrder } from "./widget/BtnPayOrder";
import { DollarSign, CreditCard, Wallet, CheckCircle2, Clock } from "lucide-react";

export const OrderCard = ({ id }: { id: number }) => {
  const { data: order } = useOrder(id);
  
  return (
    <div className="group relative flex gap-6 items-center w-auto p-5 rounded-xl shadow-lg 
                  border-2 border-[#BDBDBD]/30 bg-gradient-to-br from-[#FFFFFF] to-[#BDBDBD]/5
                  hover:shadow-2xl hover:shadow-[#424242]/20 hover:border-[#757575]
                  transition-all duration-300 hover:scale-[1.02] overflow-hidden">
      
      {/* Línea decorativa izquierda */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#000000] to-[#424242]"></div>
      
      {/* ID Section */}
      <div className="flex flex-col min-w-[60px]">
        <label className="font-bold text-[#757575] text-xs uppercase tracking-wide mb-1">
          ID
        </label>
        <p className="text-[#000000] font-bold text-lg">
          #{order?.id}
        </p>
      </div>

      {/* Separador vertical */}
      <div className="w-px h-12 bg-[#BDBDBD]/40"></div>

      {/* Monto Section */}
      <div className="flex flex-col min-w-[120px]">
        <label className="font-bold text-[#757575] text-xs uppercase tracking-wide mb-1 flex items-center gap-1">
          <DollarSign size={14} />
          Monto
        </label>
        <p className="text-[#000000] font-bold text-xl">
          ${order?.monto && formattedAmount(order.monto)}
        </p>
      </div>

      {/* Separador vertical */}
      <div className="w-px h-12 bg-[#BDBDBD]/40"></div>

      {/* Método de pago Section */}
      <div className="flex flex-col capitalize min-w-[140px]">
        <label className="font-bold text-[#757575] text-xs uppercase tracking-wide mb-1">
          Método pago
        </label>
        <div className="flex items-center gap-2">
          {order?.metodo_pago === "efectivo" ? (
            <>
              <Wallet size={20} className="text-[#424242]" />
              <span className="text-[#424242] font-semibold">
                Efectivo
              </span>
            </>
          ) : (
            <>
              <CreditCard size={20} className="text-[#424242]" />
              <span className="text-[#424242] font-semibold">
                Transferencia
              </span>
            </>
          )}
        </div>
      </div>

      {/* Separador vertical */}
      <div className="w-px h-12 bg-[#BDBDBD]/40"></div>

      {/* Estado de pago Section */}
      <div className="flex flex-col capitalize min-w-[140px]">
        <label className="font-bold text-[#757575] text-xs uppercase tracking-wide mb-1">
          Estado
        </label>
        <div>
          {order?.fecha_pago ? (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg
                          bg-gradient-to-r from-green-50 to-green-100 
                          border-2 border-green-400/50 text-green-700
                          animate-scale-in">
              <CheckCircle2 size={16} />
              <span className="text-sm font-semibold">
                Realizado
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg
                            bg-gradient-to-r from-yellow-50 to-yellow-100 
                            border-2 border-yellow-400/50 text-yellow-700
                            animate-pulse-subtle">
                <Clock size={16} />
                <span className="text-sm font-semibold">
                  Pendiente
                </span>
              </div>
              {order?.id && <BtnPayOrder id={order.id} />}
            </div>
          )}
        </div>
      </div>

      {/* Efecto de brillo en hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                    opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full 
                    transition-all duration-700 pointer-events-none"></div>

      <style>{`
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

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }

        @keyframes pulse-subtle {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        .animate-pulse-subtle {
          animation: pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};
