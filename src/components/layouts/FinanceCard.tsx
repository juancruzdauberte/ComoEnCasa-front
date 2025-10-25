import type { ReactNode } from "react";
import { formattedAmount } from "../utils/utilsFunction";
import { TrendingUp, DollarSign, ArrowUpRight } from "lucide-react";

type CardProps = {
  title: string;
  subtitle?: string;
  data: {
    label: string;
    value: number | undefined;
  }[];
  headerExtra?: ReactNode;
};

export const FinanceCard = ({
  title,
  subtitle,
  data,
  headerExtra,
}: CardProps) => {
  return (
    <div
      className="group relative flex flex-col border-2 border-gray-200/50 shadow-2xl rounded-3xl p-7 w-[400px] h-auto min-h-[280px]
                  bg-gradient-to-br from-white via-slate-50/30 to-blue-50/20
                  hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:border-gray-300/60
                  transition-all duration-700 overflow-hidden backdrop-blur-sm"
    >
      {/* Borde animado superior con gradiente */}
      <div
        className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-black via-gray-700 to-gray-300 
                    group-hover:h-2 transition-all duration-500 rounded-t-3xl"
      ></div>

      {/* Header mejorado */}
      <div className="relative z-10 text-center mb-5">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="relative">
            <div
              className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-300 rounded-full blur-md opacity-50 
                          group-hover:opacity-80 transition-opacity duration-500"
            ></div>
            <div className="relative bg-gradient-to-r from-black to-gray-700 p-2.5 rounded-full">
              <TrendingUp size={24} className="text-white" />
            </div>
          </div>
          <h2
            className="text-3xl font-bold text-black bg-clip-text
                       transition-all duration-500"
          >
            {title}
          </h2>
        </div>
        {subtitle && (
          <div className="relative inline-block">
            <p
              className="text-base text-gray-600 font-medium px-4 py-1.5 rounded-full bg-gray-100/50 backdrop-blur-sm
                       group-hover:bg-gray-100/50 group-hover:text-black transition-all duration-300"
            >
              {subtitle}
            </p>
          </div>
        )}
      </div>

      {headerExtra && (
        <div className="relative z-10 mt-3 mb-5 animate-fadeIn">
          {headerExtra}
        </div>
      )}

      {/* Separador elegante */}
      <div className="relative h-px my-4">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600 to-transparent opacity-0 
                      group-hover:opacity-100 transition-opacity duration-500"
        ></div>
      </div>

      {/* Data mejorado con cards individuales */}
      <div className="relative z-10 flex flex-col gap-3 mt-auto">
        {data.map((item, idx) => (
          <div
            key={idx}
            className="relative flex items-center justify-between px-4 py-3 rounded-xl
                     bg-white/50 backdrop-blur-sm border border-gray-200/50
                     hover:shadow-lg hover:shadow-blue-100/50
                     hover:-translate-y-0.5 transition-all duration-300 group/item cursor-pointer"
            style={{
              animation: `slideInFromLeft 0.5s ease-out ${idx * 0.15}s both`,
            }}
          >
            {/* Indicador lateral */}
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-gradient-to-b from-black to-gray-500 
                          rounded-r-full group-hover/item:h-3/4 transition-all duration-300"
            ></div>

            <div className="flex items-center gap-2">
              <DollarSign
                size={18}
                className="text-gray-400  transition-colors duration-300"
              />
              <span className="text-base text-gray-700 font-semibold group-hover/item:text-gray-900 transition-colors duration-300">
                {item.label}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span
                className="font-bold text-xl bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent
                            transition-all duration-300"
              >
                ${item.value ? formattedAmount(Number(item.value)) : "0"}
              </span>
              <ArrowUpRight
                size={16}
                className="text-gray-400 opacity-0 group-hover/item:opacity-100 
                                               group-hover/item:text-green-500 group-hover/item:translate-x-0.5 
                                               group-hover/item:-translate-y-0.5 transition-all duration-300"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Efecto de brillo diagonal mejorado */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent 
                    opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full 
                    transition-all duration-1000 pointer-events-none skew-x-12"
      ></div>

      <style>{`
        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};
