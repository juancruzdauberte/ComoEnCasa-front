import { useOrders } from "../hooks/useOrder";
import { useEffect, useState } from "react";
import { Filter } from "../common/widget/Filter";
import { renderUserOrders } from "../utils/utils";
import { useUser } from "../hooks/useAuth";
import { OrdersTable } from "../common/OrdersTable";
import { Pagination } from "../common/widget/Pagination";
import { orderStore } from "../store/orderStore";
import { FileText, SlidersHorizontal } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { playNotificationSound } from "../utils/utilsFunction";
import { OrderCardMobile } from "../common/OrderCardMobile";
import { Spinner } from "../common/widget/Spinner";

export const OrderLayout = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const { page, setPage, filter, setFilter, setLimit } = orderStore();
  const { data: orders, isLoading } = useOrders();
  const isUser = user?.rol === "user";
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    if (isUser) setFilter("hoy");
  }, [isUser, setFilter]);

  useEffect(() => {
    setLimit(isUser ? 100 : 10);
  }, [setLimit, isUser]);

  useEffect(() => {
    const apiUrl = `${import.meta.env.VITE_API_URL}/events`;

    const eventSource = new EventSource(apiUrl, { withCredentials: true });

    eventSource.onopen = () => {
      // console.log("SSE Connection opened successfully");
    };

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.action === "NEW_ORDER") {
          playNotificationSound();

          queryClient.invalidateQueries({ queryKey: ["orders"] });

          if (data.order) {
            queryClient.setQueryData(
              ["orders", filter, page],
              (oldData: any) => {
                if (!oldData) return oldData;
                return {
                  ...oldData,
                  data: [data.order, ...oldData.data],
                  pagination: {
                    ...oldData.pagination,
                    totalItems: oldData.pagination.totalItems + 1,
                  },
                };
              },
            );
            toast.info(`Nuevo pedido recibido: #${data.order.id}`);
          } else {
            toast.info("Nuevo pedido recibido");
          }
        } else if (data.action === "UPDATE_ORDER") {
          queryClient.invalidateQueries({ queryKey: ["orders"] });
          if (data.order) {
            queryClient.invalidateQueries({
              queryKey: ["order", data.order.id],
            });
            toast.info(`Pedido actualizado: #${data.order.id}`);
          }
        }
      } catch (error) {
        console.error("Error parsing SSE data:", error);
      }
    };

    eventSource.onerror = (error) => {
      console.error("SSE Connection Error:", error);
    };

    return () => {
      console.log("Closing SSE connection");
      eventSource.close();
    };
  }, [queryClient]);

  const noOrders = orders?.data.length === 0;

  return (
    <section className="w-full relative">
      {!noOrders && isUser && renderUserOrders(orders!)}

      {!isUser && (
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full">
          {/* Mobile filter toggle */}
          <div className="md:hidden mb-1">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-xl font-semibold text-sm transition-all duration-200"
            >
              <SlidersHorizontal size={16} />
              {isFilterOpen ? "Ocultar filtros" : "Ver filtros"}
              {filter && filter !== "todos" && (
                <span className="bg-white text-black rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">1</span>
              )}
            </button>
          </div>
          {/* Sidebar de Filtros */}
          <aside className={`w-full md:w-80 md:flex-shrink-0 space-y-4 ${isFilterOpen ? "block" : "hidden"} md:block`}>
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
            <div className="space-y-3">
              {/* Mobile: tarjetas */}
              <div className="md:hidden space-y-2">
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <Spinner text="Cargando pedidos..." size={25} />
                  </div>
                ) : orders?.data && orders.data.length > 0 ? (
                  orders.data.map((order) => (
                    <OrderCardMobile key={order.id} order={order} />
                  ))
                ) : (
                  !isLoading && (
                    <p className="text-center py-8 text-gray-500 font-medium">
                      No se encontraron pedidos
                    </p>
                  )
                )}
              </div>
              {/* Desktop: tabla */}
              <div className="hidden md:block">
                <OrdersTable filteredTrips={orders?.data} isFetching={isLoading} />
              </div>
              {!noOrders && <Pagination setPage={setPage} page={page} />}
            </div>
          </main>
        </div>
      )}

      {noOrders && isUser && (
        <div className="flex flex-col items-center justify-center animate-fade-in min-h-[80vh]">
          <div className="bg-gradient-to-br from-[#BDBDBD]/10 to-transparent rounded-3xl border-2 border-[#BDBDBD]/30 text-center flex flex-col items-center justify-center p-16 max-w-4xl w-full shadow-2xl">
            <div className="mx-auto mb-6 rounded-full bg-gradient-to-br from-[#BDBDBD]/20 to-[#757575]/20 flex items-center justify-center w-32 h-32">
              <FileText size={64} className="text-[#757575]" />
            </div>
            <p className="text-[#424242] font-bold text-4xl">
              Aún no hay pedidos para el día de hoy
            </p>
            <p className="text-[#757575] text-2xl mt-4">
              Los pedidos aparecerán aquí cuando estén disponibles
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
