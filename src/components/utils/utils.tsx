import type { GetOrdersResponse, Producto } from "../types/types";

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
  <section className="grid grid-cols-4 gap-4">
    {orders?.data.map((order) => (
      <div
        key={order.id}
        className="border border-black p-2 flex flex-col gap-2"
      >
        <div className="font-bold">Pedido: {order.id}</div>

        <div className="flex justify-between gap-2">
          <div className="flex flex-col">
            <span className="font-semibold">Domicilio: </span>
            <span className="capitalize">{order.domicilio}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">Hora entrega:</span>
            <span>{order.hora_entrega}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">Cliente:</span>
            <span className="capitalize">
              {order.nombre_cliente} {order.apellido_cliente}
            </span>
          </div>
        </div>

        <div className="flex gap-1">
          <span className="font-bold">Estado: </span>
          {renderEstado(order.estado)}
        </div>

        <div className="flex flex-col">
          <span className="font-bold">Observaciones:</span>
          <span>{order.observacion ?? "Sin observaciones"}</span>
        </div>

        {order.productos && (
          <div>
            <h2 className="font-bold">Productos:</h2>
            <div className="flex gap-2">{renderProductos(order.productos)}</div>
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
              <div key={index}>
                <span className="capitalize">
                  {product.nombre} - {product.cantidad}
                </span>
              </div>
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
