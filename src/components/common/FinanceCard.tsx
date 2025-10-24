import type { ReactNode } from "react";
import { formattedAmount } from "../utils/utilsFunction";
import { TrendingUp } from "lucide-react";

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
    <div className="group relative flex flex-col border-2 border-[#BDBDBD]/30 shadow-xl rounded-2xl p-6 w-[380px] h-[250px] 
                  bg-gradient-to-br from-[#FFFFFF] to-[#BDBDBD]/5 
                  hover:shadow-2xl hover:shadow-[#424242]/20 hover:border-[#757575]
                  transition-all duration-500 hover:scale-105 overflow-hidden">
      
      {/* Elemento decorativo superior */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#000000] via-[#424242] to-[#000000]"></div>
      
      {/* Elemento decorativo de fondo */}
      <div className="absolute top-4 right-4 w-16 h-16 bg-[#BDBDBD]/10 rounded-full blur-2xl 
                    group-hover:bg-[#757575]/20 transition-all duration-500"></div>

      {/* Header */}
      <div className="relative z-10 text-center mb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <TrendingUp size={24} className="text-[#424242] group-hover:text-[#000000] transition-colors duration-300" />
          <h2 className="text-3xl font-bold text-[#000000] group-hover:text-[#424242] transition-colors duration-300">
            {title}
          </h2>
        </div>
        {subtitle && (
          <p className="mt-2 text-lg text-[#757575] font-medium">
            {subtitle}
          </p>
        )}
      </div>

      {headerExtra && (
        <div className="relative z-10 mt-2 mb-4">
          {headerExtra}
        </div>
      )}

      {/* Separador */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#BDBDBD] to-transparent my-2"></div>

      {/* Data */}
      <div className="relative z-10 flex flex-col gap-3 mt-auto">
        {data.map((item, idx) => (
          <div 
            key={idx} 
            className="flex items-center justify-between px-2 py-2 rounded-lg
                     hover:bg-[#BDBDBD]/10 transition-all duration-300 group/item"
            style={{
              animation: `fadeInRow 0.4s ease-out ${idx * 0.1}s both`
            }}
          >
            <span className="text-base text-[#424242] font-medium">
              {item.label}:
            </span>
            <span className="font-bold text-xl text-[#000000] group-hover/item:text-[#424242] 
                         transition-colors duration-300">
              ${item.value ? formattedAmount(Number(item.value)) : "0"}
            </span>
          </div>
        ))}
      </div>

      {/* Efecto de brillo en hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                    opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full 
                    transition-all duration-1000 pointer-events-none"></div>

      <style>{`
        @keyframes fadeInRow {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};
