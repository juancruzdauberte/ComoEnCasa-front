import { modalStore } from "../store/modalStore";
import { orderStore } from "../store/orderStore";
import { VscEdit } from "react-icons/vsc";
import { CgClose } from "react-icons/cg";
import { useOrder } from "../hooks/useOrder";
import { Spinner } from "./widget/Spinner";
import { agruparPorCategoriaProductos, renderEstado } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import { formattedAmount, formatTimeForInput } from "../utils/utilsFunction";
export const OrderModal = () => {
  const { setIsOpen } = modalStore();
  const { orderSelected, setOrderSelected } = orderStore();
  const { data: order, isLoading } = useOrder(orderSelected!);
  const navigate = useNavigate();
  const productosAgrupados = agruparPorCategoriaProductos(order?.productos);

  return (
    <div className="bg-white rounded-md shadow-lg w-full max-w-5xl  p-6 relative animate-fadeIn text-black">
      <button
        onClick={() => {
          setOrderSelected(null);
          setIsOpen(false);
        }}
        className="absolute top-4 right-5 text-black transition hover:text-slate-600"
      >
        <CgClose size={30} />
      </button>

      <button
        onClick={() => {
          setOrderSelected(orderSelected);
          setIsOpen(false);
          navigate(`/admin/order/${orderSelected}`);
        }}
        className="absolute top-4 right-16 text-black transition hover:text-slate-600"
      >
        <VscEdit size={30} />
      </button>

      {isLoading ? (
        <div className="text-center text-gray-500 ">
          <Spinner size={40} text="Cargando..." />
        </div>
      ) : (
        <section className="flex flex-col items-center gap-10">
          <h1 className="font-bold text-2xl">Pedido ID: {order?.id}</h1>
          <div className="flex flex-wrap gap-10">
            <span className="flex gap-1 font-semibold text-xl">
              Nombre:{" "}
              <p className="font-normal text-lg">
                {order?.nombre_cliente} {order?.apellido_cliente}
              </p>
            </span>
            <span className="flex gap-1 font-semibold text-xl">
              Fecha creación:{" "}
              <p className="font-normal text-lg">
                {order?.fecha_pedido &&
                  new Date(order.fecha_pedido).toLocaleDateString()}
              </p>
            </span>
            <span className="flex gap-1 font-semibold text-xl">
              Domicilio:{" "}
              <p className="font-normal capitalize text-lg">
                {order?.domicilio}
              </p>
            </span>
            <span className="capitalize flex gap-1 font-semibold text-xl">
              Telefono:{" "}
              <p className="font-normal text-lg">{order?.telefono_cliente}</p>
            </span>
            <span className="flex gap-1 font-semibold text-xl">
              Valor:{" "}
              <p className="font-normal text-lg">
                ${order?.monto && formattedAmount(order.monto)}
              </p>
            </span>
            <span className="capitalize flex gap-1 font-semibold text-xl">
              Estado:{" "}
              <p className="font-semibold text-lg">
                {order?.estado && renderEstado(order?.estado)}
              </p>
            </span>
            <span className="flex items-center gap-1 font-semibold text-xl">
              Pago:{" "}
              <p
                className={`text-sm rounded-md px-1 ${
                  order?.fecha_pago
                    ? "text-green-500 border-green-400 bg-green-100 border"
                    : "text-yellow-500 border-yellow-400 bg-yellow-100 border"
                }`}
              >
                {order?.fecha_pago ? "Realizado" : "Pendiente"}
              </p>
            </span>
            <span className="flex gap-1 font-semibold text-xl">
              Metodo de pago:{" "}
              <p className="font-normal capitalize text-lg">
                {order?.metodo_pago}
              </p>
            </span>
            <span className="flex gap-1 font-semibold text-xl">
              Hora entrega:{" "}
              <p className="font-normal text-lg">
                {order?.hora_entrega && formatTimeForInput(order.hora_entrega)}
              </p>
            </span>
          </div>

          <div className="flex flex-col gap-7 self-start">
            <span className="flex gap-1 font-semibold text-xl">
              Observación:{" "}
              <p className="font-normal capitalize text-lg">
                {order?.observacion}
              </p>
            </span>
            <div className="flex gap-5">
              <span className="font-semibold text-xl">Productos:</span>
              <div className="flex gap-7 capitalize">
                {Object.entries(productosAgrupados!).map(
                  ([categoria, productos]) => (
                    <div key={categoria} className="mb-4">
                      <h2 className="font-bold ">{categoria}</h2>
                      <ul className="">
                        {productos.map((producto) => (
                          <li key={producto.producto_id}>
                            {producto.nombre} — {producto.cantidad}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
