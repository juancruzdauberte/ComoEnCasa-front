import type { GetOrdersResponse, Producto } from "../types/types";
import { formatTimeForInput } from "./utilsFunction";

export const renderEstado = (estado: string) => {
  const base =
    "text-sm font-semibold px-1 border rounded-md capitalize text-center ";
  const colores: Record<string, string> = {
    cancelado: "text-red-500 border-red-400 bg-red-100",
    preparando: "text-yellow-500 border-yellow-400 bg-yellow-100",
    listo: "text-green-500 border-green-400 bg-green-100",
    entregado: "text-blue-500 border-blue-400 bg-blue-100",
  };
  return <span className={`${base} ${colores[estado] || ""}`}>{estado}</span>;
};

export function agruparProductosPorCategoria(
  productosSeleccionados: { producto_id: number; cantidad: number }[],
  allProducts: { id: number; nombre: string; categoria: string }[]
) {
  const agrupados: Record<
    string,
    { producto: { id: number; nombre: string }; cantidad: number }[]
  > = {};

  productosSeleccionados.forEach(({ producto_id, cantidad }) => {
    const producto = allProducts.find((p) => p.id === producto_id);
    if (!producto) return;

    if (!agrupados[producto.categoria]) agrupados[producto.categoria] = [];
    agrupados[producto.categoria].push({ producto, cantidad });
  });

  return agrupados;
}

export const agruparPorCategoriaProductos = (
  productos: Producto[] | undefined
) => {
  return productos?.reduce<Record<string, Producto[]>>((acc, producto) => {
    const categoria = producto.categoria || "Sin categoría";
    if (!acc[categoria]) acc[categoria] = [];
    acc[categoria].push(producto);
    return acc;
  }, {});
};

export const renderUserOrders = (orders: GetOrdersResponse) => (
  <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 items-start">
    {orders?.data.map((order) => (
      <div
        key={order.id}
        className="border border-gray-300 shadow-sm p-3 flex flex-col rounded-md bg-white"
      >
        {/* Header */}
        <header className="flex justify-between items-center mb-2">
          <span className="font-bold text-xl">Pedido #{order.id}</span>
          <span className="text-xl text-gray-600">
            {renderEstado(order.estado)}
          </span>
        </header>

        {/* Datos principales */}
        <div className="flex flex-wrap gap-3 text-lg">
          <div>
            <span className="font-semibold">Cliente:</span>
            <div className="capitalize truncate">
              {order.nombre_cliente} {order.apellido_cliente}
            </div>
          </div>

          {order.hora_entrega && (
            <div>
              <span className="font-semibold">Entrega:</span>
              <div>{formatTimeForInput(order.hora_entrega)}</div>
            </div>
          )}

          <div className="col-span-2">
            <span className="font-semibold">Domicilio:</span>
            <div className="truncate">{order.domicilio}</div>
          </div>

          {order.observacion && (
            <div className="col-span-2">
              <span className="font-semibold">Obs:</span>
              <div>{order.observacion}</div>
            </div>
          )}
        </div>

        {order.productos && (
          <div className="mt-2 text-lg  overflow-y-auto">
            <h4 className="font-semibold">Productos:</h4>
            <div className="flex flex-wrap gap-x-5">
              {renderProductos(order.productos)}
            </div>
          </div>
        )}
      </div>
    ))}
  </section>
);

export const renderProductos = (productos: Producto[]) => {
  const productosPorCategoria = agruparPorCategoriaProductos(productos);

  return Object.entries(productosPorCategoria!).map(
    ([categoria, productos]) => (
      <div key={categoria}>
        <h3 className="font-bold capitalize">{categoria}</h3>
        <div>
          {productos.length > 0 ? (
            productos.map((product, index) => (
              <ul key={index} className="list-disc list-inside">
                <li className="capitalize">
                  {product.nombre} - {product.cantidad}
                </li>
              </ul>
            ))
          ) : (
            <span className="text-sm italic text-gray-500">
              No hay productos para esta categoría.
            </span>
          )}
        </div>
      </div>
    )
  );
};
