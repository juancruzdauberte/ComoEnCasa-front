import { Table } from "../layouts/Table";
import { IoIosInformationCircleOutline } from "react-icons/io";
import type { Order } from "../types/types";
import { modalStore } from "../store/modalStore";
import { orderStore } from "../store/orderStore";
import { useDeleteOrder } from "../hooks/useOrder";
import { renderEstado } from "../utils/utils";
import { Spinner } from "./widget/Spinner";
import { TrashIcon } from "./widget/TrashIcon";
import { toast } from "sonner";
import { BtnPayOrder } from "./widget/BtnPayOrder";

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
          <tr
            key={order.id}
            className="capitalize border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
            onClick={() => {
              setOrderSelected(order.id);
              setIsOpen(true);
            }}
          >
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
                      duration: 2000,
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
              {!order.fecha_pago && <BtnPayOrder id={order.id} />}
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
