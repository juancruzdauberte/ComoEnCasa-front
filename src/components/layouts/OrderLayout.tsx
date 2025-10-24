import { useOrders } from "../hooks/useOrder";
import { useEffect } from "react";
import { Filter } from "../common/widget/Filter";
import { renderUserOrders } from "../utils/utils";
import { useUser } from "../hooks/useAuth";
import { OrdersTable } from "../common/OrdersTable";
import { Pagination } from "../common/widget/Pagination";
import { orderStore } from "../store/orderStore";
import { FileText } from "lucide-react";

export const OrderLayout = () => {
  const { user } = useUser();
  const { page, setPage, filter, setFilter, setLimit } = orderStore();
  const { data: orders, isLoading } = useOrders();
  const isUser = user?.rol === "user";

  useEffect(() => {
    if (isUser) setFilter("hoy");
  }, [isUser, setFilter]);

  useEffect(() => {
    setLimit(user?.rol === "user" ? 100 : 10);
  }, [setLimit, user?.rol]);

  const noOrders = orders?.data.length === 0;

  return (
    <section className="w-full">
      {!noOrders && isUser && renderUserOrders(orders!)}

      {!isUser && (
        <div className="flex gap-6 w-full">
          {/* Sidebar de Filtros */}
          <aside className="w-80 flex-shrink-0 space-y-4">
            <Filter filter={filter} setFilter={setFilter} />

            {/* Card de Estadísticas */}
            <div
              className="bg-gradient-to-br from-[#FFFFFF] to-[#BDBDBD]/10 rounded-xl 
                          shadow-lg border-2 border-[#BDBDBD]/30 p-5
                          hover:shadow-xl hover:shadow-[#424242]/10 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3 pb-3 border-b-2 border-[#BDBDBD]/30">
                <div className="p-2 bg-gradient-to-br from-[#000000] to-[#424242] rounded-lg">
                  <FileText size={20} className="text-[#FFFFFF]" />
                </div>
                <h3 className="font-bold text-[#000000]">Resumen</h3>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[#757575] font-medium">
                    Pedidos filtrados:
                  </span>
                  <span className="text-2xl font-bold text-[#000000] bg-[#BDBDBD]/20 px-3 py-1 rounded-lg">
                    {orders?.pagination.totalItems || 0}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[#757575] font-medium">
                    Página actual:
                  </span>
                  <span className="text-lg font-semibold text-[#424242]">
                    {page} de {orders?.pagination.totalPages || 1}
                  </span>
                </div>
              </div>

              {/* Indicador de estado */}
              <div className="mt-4 pt-4 border-t border-[#BDBDBD]/30">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-xs text-[#757575]">
                    Actualizado en tiempo real
                  </span>
                </div>
              </div>
            </div>
          </aside>

          {/* Contenedor Principal de la Tabla */}
          <main className="flex-1 min-w-0">
            <div className="space-y-4">
              <OrdersTable
                filteredTrips={orders?.data}
                isFetching={isLoading}
              />
              {!noOrders && <Pagination setPage={setPage} page={page} />}
            </div>
          </main>
        </div>
      )}

      {noOrders && isUser && (
        <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
          <div
            className="bg-gradient-to-br from-[#BDBDBD]/10 to-transparent rounded-2xl 
                        border-2 border-[#BDBDBD]/30 p-8 text-center max-w-md"
          >
            <div
              className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#BDBDBD]/20 to-[#757575]/20 
                          flex items-center justify-center"
            >
              <FileText size={40} className="text-[#757575]" />
            </div>
            <p className="text-[#424242] font-semibold text-lg">
              Aún no hay pedidos para el día de hoy
            </p>
            <p className="text-[#757575] text-sm mt-2">
              Los pedidos aparecerán aquí cuando estén disponibles
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
