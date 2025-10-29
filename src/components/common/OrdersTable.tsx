import { memo, useCallback } from "react";
import { Table } from "../layouts/Table";
import type { Order } from "../types/types";
import { modalStore } from "../store/modalStore";
import { orderStore } from "../store/orderStore";
import { useDeleteOrder } from "../hooks/useOrder";
import { renderEstado } from "../utils/utils";
import { Spinner } from "./widget/Spinner";
import { toast } from "sonner";
import { BtnPayOrder } from "./widget/BtnPayOrder";
import { formatTimeForInput } from "../utils/utilsFunction";
import { Eye, Trash2, Clock, MapPinHouse, Hash, Store } from "lucide-react";

const headers = [
  { label: "ID", key: "id" },
  { label: "Domicilio", key: "domicilio" },
  { label: "Entrega", key: "hora_entrega" },
  { label: "Estado", key: "estado" },
  { label: "Acciones", key: "acciones" },
];

// OPTIMIZACIÓN: Memoizar el componente completo
export const OrdersTable = memo(function OrdersTable({
  filteredTrips,
  isFetching,
}: {
  filteredTrips: Order[] | undefined;
  isFetching: boolean;
}) {
  const { setOrderSelected } = orderStore();
  const { setIsOpen } = modalStore();
  const { mutate: order } = useDeleteOrder();

  // OPTIMIZACIÓN: Memoizar callbacks
  const handleDelete = useCallback(
    (id: number) => {
      order(id);
    },
    [order]
  );

  const handleViewOrder = useCallback(
    (orderId: number, e: React.MouseEvent) => {
      e.stopPropagation();
      setOrderSelected(orderId);
      setIsOpen(true);
    },
    [setOrderSelected, setIsOpen]
  );

  const handleDeleteConfirm = useCallback(
    (orderId: number, e: React.MouseEvent) => {
      e.stopPropagation();
      toast.warning(
        `¿Estás seguro de que quieres eliminar el pedido #${orderId}?`,
        {
          duration: 3000,
          action: {
            label: "Eliminar",
            onClick: () => handleDelete(orderId),
          },
        }
      );
    },
    [handleDelete]
  );

  const messageNoData =
    !isFetching && (!filteredTrips || filteredTrips.length === 0)
      ? "No se encontraron pedidos"
      : undefined;

  return (
    <div className="w-full">
      <Table
        headers={headers}
        data={isFetching ? [] : filteredTrips || []}
        noDataMessage={messageNoData}
        onRowClick={(order) => {
          setOrderSelected(order.id);
          setIsOpen(true);
        }}
        renderRow={(order) => (
          <OrderTableRow
            key={order.id}
            order={order}
            onView={handleViewOrder}
            onDelete={handleDeleteConfirm}
          />
        )}
      />

      {isFetching && (
        <div className="flex flex-col items-center justify-center py-12 animate-pulse">
          <Spinner text="Cargando pedidos..." size={25} />
        </div>
      )}
    </div>
  );
});

// OPTIMIZACIÓN: Componente de fila memoizado separado
const OrderTableRow = memo(function OrderTableRow({
  order,
  onView,
  onDelete,
}: {
  order: Order;
  onView: (id: number, e: React.MouseEvent) => void;
  onDelete: (id: number, e: React.MouseEvent) => void;
}) {
  return (
    <>
      <td className="p-4 text-gray-700 transition-colors duration-fast group-hover:text-black relative">
        <div
          className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-black to-gray-700 
                     opacity-0 group-hover:opacity-100 transition-opacity duration-fast"
        ></div>

        <div className="flex items-center gap-0.5">
          <div className="bg-gray-200/20 rounded-lg group-hover:bg-gray-700/20 transition-colors duration-fast">
            <Hash
              size={16}
              className="text-gray-700 group-hover:text-black transition-colors duration-fast"
            />
          </div>
          <span className="font-bold text-black">{order.id}</span>
        </div>
      </td>

      <td className="p-4 text-gray-700 transition-colors duration-fast group-hover:text-black">
        <div className="flex items-center gap-2">
          {order.domicilio === null ? (
            <Store size={18} className="text-gray-600 flex-shrink-0" />
          ) : (
            <MapPinHouse size={18} className="text-gray-600 flex-shrink-0" />
          )}

          <div className="flex flex-col">
            <span
              className="text-gray-700 font-medium truncate max-w-xs"
              title={order.domicilio}
            >
              {order.domicilio === null ? "busca" : order.domicilio}
            </span>

            <span>{order.domicilio === null && order.apellido_cliente}</span>
          </div>
        </div>
      </td>

      <td className="p-4 text-gray-700 transition-colors duration-fast group-hover:text-black">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-gray-200/20 rounded-lg">
            <Clock size={14} className="text-gray-600" />
          </div>
          <span className="text-gray-700 font-semibold">
            {order.hora_entrega
              ? formatTimeForInput(order.hora_entrega)
              : "S/H"}
          </span>
        </div>
      </td>

      <td className="p-4 text-gray-700 transition-colors duration-fast group-hover:text-black">
        <div className="inline-block">{renderEstado(order.estado)}</div>
      </td>

      <td className="p-4 text-gray-700 transition-colors duration-fast group-hover:text-black">
        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded-lg bg-gray-200/20 hover:bg-black text-gray-700 hover:text-white
                       transition-gpu duration-fast hover:scale-110 group/btn relative overflow-hidden
                       gpu-accelerated"
            onClick={(e) => onView(order.id, e)}
            title="Ver detalles"
          >
            <Eye size={18} />
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                         opacity-0 group-hover/btn:opacity-100 transform -translate-x-full group-hover/btn:translate-x-full 
                         transition-transform duration-700 pointer-events-none"
            ></div>
          </button>

          <button
            className="p-2 rounded-lg bg-red-50 hover:bg-red-600 text-red-600 hover:text-white
                       transition-gpu duration-fast hover:scale-110 group/btn relative overflow-hidden
                        hover:border-red-600  gpu-accelerated"
            onClick={(e) => onDelete(order.id, e)}
            title="Eliminar pedido"
          >
            <Trash2 size={18} />
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                         opacity-0 group-hover/btn:opacity-100 transform -translate-x-full group-hover/btn:translate-x-full 
                         transition-transform duration-700 pointer-events-none"
            ></div>
          </button>

          {!order.fecha_pago && (
            <div onClick={(e) => e.stopPropagation()}>
              <BtnPayOrder id={order.id} />
            </div>
          )}
        </div>
      </td>
    </>
  );
});
