import React from "react"; // <--- Añadido
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
import { Eye, Trash2, Clock, MapPin, Hash } from "lucide-react";

const headers = [
  { label: "ID", key: "id" },
  { label: "Domicilio", key: "domicilio" },
  { label: "Entrega", key: "hora_entrega" },
  { label: "Estado", key: "estado" },
  { label: "Acciones", key: "acciones" },
];

export function OrdersTable({
  filteredTrips,
  isFetching,
}: {
  filteredTrips: Order[] | undefined;
  isFetching: boolean;
}) {
  const { setOrderSelected } = orderStore();
  const { setIsOpen } = modalStore();
  const { mutate: order } = useDeleteOrder();

  const handleDelete = (id: number) => {
    order(id);
  };

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
          <React.Fragment key={order.id}>
            <td className="p-4 text-[#424242] transition-colors duration-300 group-hover:text-[#000000] relative">
              <div
                className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#000000] to-[#424242] 
                           opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></div>

              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-[#BDBDBD]/20 rounded-lg group-hover:bg-[#424242]/20 transition-colors duration-300">
                  <Hash
                    size={16}
                    className="text-[#424242] group-hover:text-[#000000] transition-colors duration-300"
                  />
                </div>
                <span className="font-bold text-[#000000]">#{order.id}</span>
              </div>
            </td>

            <td className="p-4 text-[#424242] transition-colors duration-300 group-hover:text-[#000000]">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-[#757575] flex-shrink-0" />
                <span
                  className="text-[#424242] font-medium truncate max-w-xs"
                  title={order.domicilio}
                >
                  {order.domicilio}
                </span>
              </div>
            </td>

            <td className="p-4 text-[#424242] transition-colors duration-300 group-hover:text-[#000000]">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-[#BDBDBD]/20 rounded-lg">
                  <Clock size={14} className="text-[#757575]" />
                </div>
                <span className="text-[#424242] font-semibold">
                  {order.hora_entrega
                    ? formatTimeForInput(order.hora_entrega)
                    : "S/H"}
                </span>
              </div>
            </td>

            <td className="p-4 text-[#424242] transition-colors duration-300 group-hover:text-[#000000]">
              <div className="inline-block">{renderEstado(order.estado)}</div>
            </td>

            <td className="p-4 text-[#424242] transition-colors duration-300 group-hover:text-[#000000]">
              <div className="flex items-center gap-2">
                <button
                  className="p-2.5 rounded-lg bg-[#BDBDBD]/20 hover:bg-[#000000] text-[#424242] hover:text-[#FFFFFF]
                             transition-all duration-300 hover:scale-110 group/btn relative overflow-hidden"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOrderSelected(order.id);
                    setIsOpen(true);
                  }}
                  title="Ver detalles"
                >
                  <Eye size={18} />
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                               opacity-0 group-hover/btn:opacity-100 transform -translate-x-full group-hover/btn:translate-x-full 
                               transition-all duration-700 pointer-events-none"
                  ></div>
                </button>

                <button
                  className="p-2.5 rounded-lg bg-red-50 hover:bg-red-600 text-red-600 hover:text-[#FFFFFF]
                             transition-all duration-300 hover:scale-110 group/btn relative overflow-hidden
                             border border-red-200 hover:border-red-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    toast.warning(
                      `¿Estás seguro de que quieres eliminar el pedido #${order.id}?`,
                      {
                        duration: 3000,
                        action: {
                          label: "Eliminar",
                          onClick: () => handleDelete(order.id),
                        },
                      }
                    );
                  }}
                  title="Eliminar pedido"
                >
                  <Trash2 size={18} />
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                               opacity-0 group-hover/btn:opacity-100 transform -translate-x-full group-hover/btn:translate-x-full 
                               transition-all duration-700 pointer-events-none"
                  ></div>
                </button>

                {!order.fecha_pago && (
                  <div onClick={(e) => e.stopPropagation()}>
                    <BtnPayOrder id={order.id} />
                  </div>
                )}
              </div>
            </td>
          </React.Fragment>
        )}
      />

      {isFetching && (
        <div className="flex flex-col items-center justify-center py-12 animate-pulse">
          <Spinner text="Cargando pedidos..." size={25} />
        </div>
      )}
    </div>
  );
}
