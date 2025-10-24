import type { JSX } from "react";
import type { GetOrdersResponse, Producto } from "../types/types";
import { formatTimeForInput } from "./utilsFunction";
import { CheckCircle2, Clock, Package, XCircle } from "lucide-react";

export const renderEstado = (estado: string) => {
  const estados: Record<
    string,
    {
      bg: string;
      border: string;
      text: string;
      icon: JSX.Element;
    }
  > = {
    cancelado: {
      bg: "bg-gradient-to-r from-red-50 to-red-100",
      border: "border-red-400/50",
      text: "text-red-700",
      icon: <XCircle size={14} />,
    },
    preparando: {
      bg: "bg-gradient-to-r from-yellow-50 to-yellow-100",
      border: "border-yellow-400/50",
      text: "text-yellow-700",
      icon: <Clock size={14} />,
    },
    listo: {
      bg: "bg-gradient-to-r from-green-50 to-green-100",
      border: "border-green-400/50",
      text: "text-green-700",
      icon: <CheckCircle2 size={14} />,
    },
    entregado: {
      bg: "bg-gradient-to-r from-blue-50 to-blue-100",
      border: "border-blue-400/50",
      text: "text-blue-700",
      icon: <Package size={14} />,
    },
  };

  const estadoConfig = estados[estado] || {
    bg: "bg-gray-100",
    border: "border-gray-400",
    text: "text-gray-700",
    icon: <Clock size={14} />,
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg border-2 
                    font-semibold text-sm capitalize ${estadoConfig.bg} ${estadoConfig.border} ${estadoConfig.text}
                    shadow-sm hover:shadow-md transition-all duration-300`}
    >
      {estadoConfig.icon}
      {estado}
    </span>
  );
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
  <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6">
    {orders?.data.map((order, index) => (
      <div
        key={order.id}
        className="group border-2 border-[#BDBDBD]/30 shadow-lg rounded-2xl p-5 flex flex-col 
                 bg-gradient-to-br from-[#FFFFFF] to-[#BDBDBD]/5
                 hover:shadow-2xl hover:shadow-[#424242]/20 hover:border-[#757575]
                 transition-all duration-300 hover:scale-105 relative overflow-hidden w-[290px]"
        style={{
          animation: `fadeInScale 0.4s ease-out ${index * 0.05}s both`,
        }}
      >
        {/* Decoración superior */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#000000] via-[#424242] to-[#000000]"></div>

        {/* Header */}
        <header className="flex justify-between items-center mb-4 pb-3 border-b-2 border-[#BDBDBD]/30">
          <span className="font-bold text-xl text-[#000000] flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#000000] to-[#424242] 
                          flex items-center justify-center text-[#FFFFFF] text-sm"
            >
              {order.id}
            </div>
            Pedido
          </span>
          <div className="scale-90">{renderEstado(order.estado)}</div>
        </header>

        {/* Datos principales */}
        <div className="space-y-3 text-base flex-1">
          <div className="flex gap-3">
            <div>
              <span className="font-bold text-[#757575] text-xs uppercase block mb-1">
                Domicilio
              </span>
              <div className="text-[#424242] line-clamp-2">
                {order.domicilio}
              </div>
            </div>
            <div>
              {order.hora_entrega && (
                <div>
                  <span className="font-bold text-[#757575] text-xs uppercase block mb-1">
                    Entrega
                  </span>
                  <div className="flex items-center gap-2 text-[#424242] font-semibold">
                    <Clock size={16} className="text-[#757575]" />
                    {formatTimeForInput(order.hora_entrega)}
                  </div>
                </div>
              )}
            </div>
          </div>

          {order.observacion && (
            <div>
              <span className="font-bold text-[#757575] text-xs uppercase block mb-1">
                Observación
              </span>
              <div className="text-[#424242] text-sm italic bg-[#BDBDBD]/10 p-2 rounded-lg">
                {order.observacion}
              </div>
            </div>
          )}
        </div>

        {order.productos && (
          <div className="mt-4 pt-4 border-t-2 border-[#BDBDBD]/30">
            <h4 className="font-bold text-[#000000] mb-2 flex items-center gap-2">
              <Package size={16} className="text-[#757575]" />
              Productos
            </h4>
            <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
              {renderProductos(order.productos)}
            </div>
          </div>
        )}

        {/* Efecto de brillo en hover */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                      opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full 
                      transition-all duration-1000 pointer-events-none"
        ></div>
      </div>
    ))}

    <style>{`
      @keyframes fadeInScale {
        from {
          opacity: 0;
          transform: scale(0.9);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }

      .custom-scrollbar::-webkit-scrollbar {
        width: 4px;
      }

      .custom-scrollbar::-webkit-scrollbar-track {
        background: #BDBDBD20;
        border-radius: 4px;
      }

      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: #757575;
        border-radius: 4px;
      }

      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: #424242;
      }
    `}</style>
  </section>
);

export const renderProductos = (productos: Producto[]) => {
  const productosPorCategoria = agruparPorCategoriaProductos(productos);

  return Object.entries(productosPorCategoria!).map(
    ([categoria, productos]) => (
      <div key={categoria} className="bg-[#BDBDBD]/5 rounded-lg p-2">
        <h3 className="font-bold capitalize text-[#424242] text-sm mb-1 flex items-center gap-1">
          <div className="w-1 h-4 bg-[#000000] rounded-full"></div>
          {categoria}
        </h3>
        <div>
          {productos.length > 0 ? (
            <ul className="space-y-1">
              {productos.map((product, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-[#424242] text-sm"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#757575]"></div>
                  <span className="capitalize font-medium">
                    {product.nombre}
                  </span>
                  <span className="ml-auto font-bold text-[#000000] bg-[#BDBDBD]/20 px-2 py-0.5 rounded">
                    x{product.cantidad}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <span className="text-xs italic text-[#757575]">
              No hay productos para esta categoría.
            </span>
          )}
        </div>
      </div>
    )
  );
};
