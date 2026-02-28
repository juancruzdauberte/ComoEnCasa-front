import { useOrders } from "../hooks/useOrder";
import { useEffect } from "react";
import { Filter } from "../common/widget/Filter";
import { renderUserOrders } from "../utils/utils";
import { useUser } from "../hooks/useAuth";
import { OrdersTable } from "../common/OrdersTable";
import { Pagination } from "../common/widget/Pagination";
import { orderStore } from "../store/orderStore";
import { FileText, UserCog } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { playNotificationSound } from "../utils/utilsFunction";

export const OrderLayout = () => {
  const queryClient = useQueryClient();
  const { user, viewMode, setViewMode } = useUser();
  const { page, setPage, filter, setFilter, setLimit } = orderStore();
  const { data: orders, isLoading } = useOrders();
  const isUser = user?.rol === "user" || viewMode === "user";

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
      {/* Botón Volver a Admin (solo visible para admin en viewMode user) */}
      {viewMode === "user" && user?.rol === "admin" && (
        <div className="absolute top-[-40px] left-2 z-50">
          <button
            onClick={() => setViewMode("admin")}
            className="flex items-center gap-1.5 bg-black text-white px-3 py-1.5 rounded-lg 
                     hover:bg-gray-800 transition-colors shadow-lg font-semibold text-sm"
          >
            <UserCog size={16} />
            Admin
          </button>
        </div>
      )}

      {/* Margen superior si estamos en viewMode user para no solapar el botón con las tarjetas */}
      <div
        className={viewMode === "user" && user?.rol === "admin" ? "mt-16" : ""}
      >
        {!noOrders && isUser && renderUserOrders(orders!)}
      </div>

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
        <div
          className={`flex flex-col items-center justify-center animate-fade-in ${
            viewMode === "user" ? "min-h-[80vh]" : "py-16"
          }`}
        >
          <div
            className={`bg-gradient-to-br from-[#BDBDBD]/10 to-transparent rounded-3xl 
                        border-2 border-[#BDBDBD]/30 text-center flex flex-col items-center justify-center ${
                          viewMode === "user"
                            ? "p-16 max-w-4xl w-full shadow-2xl"
                            : "p-8 max-w-md"
                        }`}
          >
            <div
              className={`mx-auto mb-6 rounded-full bg-gradient-to-br from-[#BDBDBD]/20 to-[#757575]/20 
                          flex items-center justify-center ${
                            viewMode === "user" ? "w-32 h-32" : "w-20 h-20 mb-4"
                          }`}
            >
              <FileText
                size={viewMode === "user" ? 64 : 40}
                className="text-[#757575]"
              />
            </div>
            <p
              className={`text-[#424242] font-bold ${
                viewMode === "user" ? "text-4xl" : "text-lg font-semibold"
              }`}
            >
              Aún no hay pedidos para el día de hoy
            </p>
            <p
              className={`text-[#757575] ${
                viewMode === "user" ? "text-2xl mt-4" : "text-sm mt-2"
              }`}
            >
              Los pedidos aparecerán aquí cuando estén disponibles
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
