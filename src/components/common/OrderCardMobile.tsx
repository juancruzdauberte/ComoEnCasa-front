import { memo, useCallback } from "react";
import { Eye, Trash2, Clock, MapPinHouse, Store, Hash } from "lucide-react";
import type { Order } from "../types/types";
import { BtnPayOrder } from "./widget/BtnPayOrder";
import { renderEstado } from "../utils/utils";
import { formatTimeForInput } from "../utils/utilsFunction";
import { modalStore } from "../store/modalStore";
import { orderStore } from "../store/orderStore";
import { useDeleteOrder } from "../hooks/useOrder";
import { toast } from "sonner";

export const OrderCardMobile = memo(function OrderCardMobile({
  order,
}: {
  order: Order;
}) {
  const { setOrderSelected } = orderStore();
  const { setIsOpen } = modalStore();
  const { mutate: deleteOrder } = useDeleteOrder();

  const handleView = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setOrderSelected(order.id);
      setIsOpen(true);
    },
    [order.id, setOrderSelected, setIsOpen]
  );

  const handleDelete = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      toast.warning(
        `¿Estás seguro de que quieres eliminar el pedido #${order.id}?`,
        {
          duration: 3000,
          action: {
            label: "✓ Confirmar",
            onClick: () => deleteOrder(order.id),
          },
        }
      );
    },
    [order.id, deleteOrder]
  );

  return (
    <div
      className="bg-white rounded-xl border border-gray-200 shadow-sm p-3 cursor-pointer active:scale-[0.99] transition-transform"
      onClick={handleView}
    >
      {/* ID + Estado */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1">
          <Hash size={13} className="text-gray-500" />
          <span className="font-bold text-black text-sm">{order.id}</span>
        </div>
        <div className="scale-90">{renderEstado(order.estado)}</div>
      </div>

      {/* Domicilio */}
      <div className="flex items-center gap-2 mb-1">
        {order.domicilio === null ? (
          <Store size={13} className="text-gray-500 flex-shrink-0" />
        ) : (
          <MapPinHouse size={13} className="text-gray-500 flex-shrink-0" />
        )}
        <span className="text-sm text-gray-700 truncate">
          {order.domicilio === null
            ? `busca${order.apellido_cliente ? ` — ${order.apellido_cliente}` : ""}`
            : order.domicilio}
        </span>
      </div>

      {/* Hora */}
      {order.hora_entrega && (
        <div className="flex items-center gap-2 mb-2">
          <Clock size={13} className="text-gray-500" />
          <span className="text-sm font-semibold text-gray-700">
            {formatTimeForInput(order.hora_entrega)}
          </span>
        </div>
      )}

      {/* Acciones */}
      <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
        <button
          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-gray-100 hover:bg-black hover:text-white text-gray-700 rounded-lg text-xs font-semibold transition-colors"
          onClick={handleView}
        >
          <Eye size={13} /> Ver
        </button>
        <button
          className="p-1.5 bg-red-50 hover:bg-red-600 hover:text-white text-red-600 rounded-lg transition-colors"
          onClick={handleDelete}
        >
          <Trash2 size={13} />
        </button>
        {!order.fecha_pago && (
          <div onClick={(e) => e.stopPropagation()}>
            <BtnPayOrder id={order.id} />
          </div>
        )}
      </div>
    </div>
  );
});
