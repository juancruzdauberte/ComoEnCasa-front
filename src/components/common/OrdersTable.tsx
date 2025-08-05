import { Table } from "../layouts/Table";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import type { Order } from "../types/types";
import { modalStore } from "../store/modalStore";
import { orderStore } from "../store/orderStore";
import { useDeleteOrder } from "../hooks/useOrder";
import { renderEstado } from "../utils/utils";
import { Spinner } from "./widget/Spinner";

const headers = [
  { label: "ID", key: "id" },
  { label: "Nombre", key: "apellido" },
  { label: "Fecha creación", key: "fecha" },
  { label: "Domicilio", key: "domicilio" },
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
    if (
      window.confirm(`¿Seguro que quieres eliminar el pedido con ID ${id}?`)
    ) {
      order(id);
    }
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
                onClick={() => handleDelete(order.id)}
                title="Eliminar"
              >
                <MdDeleteForever size={30} />
              </button>
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
