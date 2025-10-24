import { BiLastPage, BiFirstPage } from "react-icons/bi";
import { useOrders } from "../../hooks/useOrder";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  page: number;
  setPage: (page: number | ((prev: number) => number)) => void;
};

export const Pagination = ({ page, setPage }: Props) => {
  const { data: orders } = useOrders();
  const totalPages = orders?.pagination.totalPages ?? 1;

  return (
    <section className="flex justify-center items-center gap-3 mt-6">
      <div className="flex items-center gap-2 bg-[#FFFFFF] rounded-xl shadow-lg border-2 border-[#BDBDBD]/30 p-2
                    hover:shadow-xl hover:shadow-[#424242]/10 transition-all duration-300">
        
        {/* Botón Primera Página */}
        {page > 1 && (
          <button
            disabled={page <= 1}
            onClick={() => setPage(1)}
            className="p-2.5 rounded-lg bg-[#BDBDBD]/20 hover:bg-[#000000] text-[#424242] hover:text-[#FFFFFF]
                     transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed
                     disabled:hover:bg-[#BDBDBD]/20 disabled:hover:text-[#424242] disabled:hover:scale-100
                     group relative overflow-hidden"
            aria-label="Primera página"
          >
            <BiFirstPage size={20} />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                          opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full 
                          transition-all duration-700 pointer-events-none"></div>
          </button>
        )}

        {/* Botón Página Anterior */}
        {page > 1 && (
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className="p-2.5 rounded-lg bg-[#BDBDBD]/20 hover:bg-[#424242] text-[#424242] hover:text-[#FFFFFF]
                     transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed
                     disabled:hover:bg-[#BDBDBD]/20 disabled:hover:text-[#424242] disabled:hover:scale-100
                     group relative overflow-hidden"
            aria-label="Página anterior"
          >
            <ChevronLeft size={20} />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                          opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full 
                          transition-all duration-700 pointer-events-none"></div>
          </button>
        )}

        {/* Indicador de Página */}
        <div className="px-6 py-2 bg-gradient-to-r from-[#000000] to-[#424242] rounded-lg">
          <span className="text-[#FFFFFF] font-bold text-sm whitespace-nowrap">
            Página {totalPages === 0 ? 0 : page} de {totalPages}
          </span>
        </div>

        {/* Botón Página Siguiente */}
        {totalPages > 0 && page !== totalPages && (
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="p-2.5 rounded-lg bg-[#BDBDBD]/20 hover:bg-[#424242] text-[#424242] hover:text-[#FFFFFF]
                     transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed
                     disabled:hover:bg-[#BDBDBD]/20 disabled:hover:text-[#424242] disabled:hover:scale-100
                     group relative overflow-hidden"
            aria-label="Página siguiente"
          >
            <ChevronRight size={20} />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                          opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full 
                          transition-all duration-700 pointer-events-none"></div>
          </button>
        )}

        {/* Botón Última Página */}
        {totalPages > 0 && page !== totalPages && (
          <button
            disabled={page >= totalPages}
            onClick={() => setPage(totalPages)}
            className="p-2.5 rounded-lg bg-[#BDBDBD]/20 hover:bg-[#000000] text-[#424242] hover:text-[#FFFFFF]
                     transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed
                     disabled:hover:bg-[#BDBDBD]/20 disabled:hover:text-[#424242] disabled:hover:scale-100
                     group relative overflow-hidden"
            aria-label="Última página"
          >
            <BiLastPage size={20} />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                          opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full 
                          transition-all duration-700 pointer-events-none"></div>
          </button>
        )}
      </div>
    </section>
  );
};
