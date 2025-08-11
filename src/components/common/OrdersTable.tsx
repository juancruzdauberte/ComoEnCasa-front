import { Table } from "../layouts/Table";
import { IoIosInformationCircleOutline } from "react-icons/io";
import type { Order } from "../types/types";
import { modalStore } from "../store/modalStore";
import { orderStore } from "../store/orderStore";
import { useDeleteOrder, usePayOrder } from "../hooks/useOrder";
import { renderEstado } from "../utils/utils";
import { Spinner } from "./widget/Spinner";
import { TrashIcon } from "./widget/TrashIcon";
import { TbCashRegister } from "react-icons/tb";
import { toast } from "sonner";

const headers = [
  { label: "ID", key: "id" },
  { label: "Nombre", key: "apellido" },
  { label: "Domicilio", key: "domicilio" },
  { label: "Fecha creación", key: "fecha" },
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
  const { payOrderMutation } = usePayOrder();

  const handleDelete = (id: number) => {
    order(id);
  };

  const messageNoData =
    !isFetching && (!filteredTrips || filteredTrips.length === 0)
      ? "No se encontraron pedidos"
      : undefined;
  return (
    <div>
      <Table
        headers={headers}
        data={isFetching ? [] : filteredTrips || []}
        noDataMessage={messageNoData}
        renderRow={(order) => (
          <tr key={order.id} className="capitalize border-b border-gray-200">
            <td className="p-2">{order.id}</td>
            <td className="p-2">
              {order.nombre_cliente} {order.apellido_cliente}
            </td>
            <td className="p-2">{order.domicilio}</td>
            <td className="p-2">
              {new Date(order.fecha_pedido).toLocaleDateString("es-AR")}
            </td>
            <td className="p-2 font-bold capitalize">
              <span className="capitalize font-semibold">
                {renderEstado(order.estado)}
              </span>
            </td>
            <td className="flex items-center p-2">
              <button
                className="text-blue-600 hover:text-blue-400"
                onClick={() => {
                  setOrderSelected(order.id);
                  setIsOpen(true);
                }}
                title="Ver"
              >
                <IoIosInformationCircleOutline size={30} />
              </button>
              <button
                className="text-red-600 hover:text-red-400"
                onClick={() => {
                  toast.warning(
                    `¿Estás seguro de que quieres eliminar el pedido ${order.id}?`,
                    {
                      duration: 1700,
                      action: {
                        label: "Eliminar",
                        onClick: () => handleDelete(order.id),
                      },
                    }
                  );
                }}
                title="Eliminar"
              >
                <TrashIcon size={30} />
              </button>
              {!order.fecha_pago && (
                <button
                  onClick={() => {
                    toast.warning(
                      `¿Estás seguro de que quieres pagar el pedido ${order.id}?`,
                      {
                        duration: 1700,
                        action: {
                          label: "Pagar",
                          onClick: () => payOrderMutation(order.id),
                        },
                      }
                    );
                  }}
                  type="button"
                  className="border rounded-md border-orange-400 p-1 font-semibold bg-orange-400 text-white"
                >
                  <TbCashRegister />
                </button>
              )}
            </td>
          </tr>
        )}
      />
      {isFetching && (
        <div className="flex justify-center mt-4">
          <Spinner text="Cargando pedidos..." size={25} />
        </div>
      )}
    </div>
  );
}
