import { modalStore } from "../store/modalStore";
import { orderStore } from "../store/orderStore";
import { VscEdit } from "react-icons/vsc";
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
    <div className="bg-gradient-to-br from-white via-slate-50 to-white rounded-2xl shadow-2xl w-full max-w-5xl p-8 relative animate-fadeIn text-gray-800 border border-gray-100 backdrop-blur-sm">
      {/* Edit Button with Hover Animation */}
      <button
        onClick={() => {
          setOrderSelected(orderSelected);
          setIsOpen(false);
          navigate(`/admin/order/${orderSelected}`);
        }}
        className="absolute top-6 right-6 text-gray-600 transition-all duration-300 hover:text-blue-600 hover:scale-110 hover:rotate-12 p-2 rounded-lg hover:bg-blue-50 group"
        aria-label="Editar pedido"
      >
        <VscEdit
          size={28}
          className="transition-transform duration-300 group-hover:rotate-12"
        />
      </button>

      {isLoading ? (
        <div className="text-center text-gray-500 py-12">
          <Spinner size={40} text="Cargando..." />
        </div>
      ) : (
        <section className="flex flex-col items-center gap-8 animate-slideUp">
          {/* Header with animated gradient */}
          <div className="relative">
            <h1 className="font-bold text-3xl bg-gradient-to-r from-gray-700 to-gray-500 bg-clip-text text-transparent animate-pulse-slow">
              Pedido #{order?.id}
            </h1>
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transform scale-x-0 animate-expandWidth"></div>
          </div>

          {/* Info Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {/* Fecha Creación Card */}
            <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 group">
              <div className="flex items-center gap-2">
                <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                  📅
                </span>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                    Fecha creación
                  </p>
                  <p className="font-semibold text-gray-800">
                    {order?.fecha_pedido &&
                      new Date(order.fecha_pedido).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Domicilio Card */}
            <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 group">
              <div className="flex items-center gap-2">
                <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                  🏠
                </span>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                    Domicilio
                  </p>
                  <p className="font-semibold text-gray-800 capitalize">
                    {order?.domicilio}
                  </p>
                </div>
              </div>
            </div>

            {/* Valor Card */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-green-200 group">
              <div className="flex items-center gap-2">
                <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                  💰
                </span>
                <div>
                  <p className="text-xs text-green-700 font-medium uppercase tracking-wide">
                    Monto
                  </p>
                  <p className="font-bold text-xl text-green-600">
                    ${order?.monto && formattedAmount(order.monto)}
                  </p>
                </div>
              </div>
            </div>

            {/* Estado Card */}
            <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 group">
              <div className="flex items-center gap-2">
                <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                  📊
                </span>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                    Estado
                  </p>
                  <div className="font-semibold capitalize">
                    {order?.estado && renderEstado(order?.estado)}
                  </div>
                </div>
              </div>
            </div>

            {/* Pago Card */}
            <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 group">
              <div className="flex items-center gap-2">
                <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                  {order?.fecha_pago ? "✅" : "⏳"}
                </span>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                    Pago
                  </p>
                  <span
                    className={`inline-block text-sm font-semibold rounded-lg px-3 py-1 mt-1 transition-all duration-300 ${
                      order?.fecha_pago
                        ? "text-green-700 border-green-300 bg-green-100 border hover:bg-green-200"
                        : "text-yellow-700 border-yellow-300 bg-yellow-100 border hover:bg-yellow-200"
                    }`}
                  >
                    {order?.fecha_pago ? "Realizado" : "Pendiente"}
                  </span>
                </div>
              </div>
            </div>

            {/* Método de Pago Card */}
            <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 group">
              <div className="flex items-center gap-2">
                <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                  {order?.metodo_pago === "efectivo" ? "💵" : "📲"}
                </span>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                    Método de pago
                  </p>
                  <p className="font-semibold text-gray-800 capitalize">
                    {order?.metodo_pago === "efectivo"
                      ? "Efectivo"
                      : "Transferencia"}
                  </p>
                </div>
              </div>
            </div>

            {/* Hora Entrega Card */}
            {order?.hora_entrega && (
              <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 group">
                <div className="flex items-center gap-2">
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                    ⏰
                  </span>
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                      Hora entrega
                    </p>
                    <p className="font-semibold text-gray-800">
                      {formatTimeForInput(order.hora_entrega)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Observación Section */}
          {order?.observacion && (
            <div className="w-full bg-blue-50 rounded-xl p-5 border-l-4 border-blue-500 shadow-md hover:shadow-lg transition-all duration-300 animate-fadeIn">
              <div className="flex items-start gap-3">
                <span className="text-2xl mt-1">📝</span>
                <div>
                  <p className="text-sm text-blue-700 font-semibold uppercase tracking-wide mb-1">
                    Observación
                  </p>
                  <p className="text-gray-700 capitalize leading-relaxed">
                    {order?.observacion}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Productos Section */}
          <div className="w-full bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl p-6 shadow-md border border-gray-300">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-3xl">🛒</span>
              <h2 className="font-bold text-xl text-gray-900">Productos</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(productosAgrupados!).map(
                ([categoria, productos]) => (
                  <div
                    key={categoria}
                    className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-gray-300 group"
                  >
                    <h3 className="font-bold text-lg text-gray-900 mb-3 pb-2 border-b-2 border-gray-200 capitalize group-hover:text-gray-600 transition-colors duration-300">
                      {categoria}
                    </h3>
                    <ul className="space-y-2">
                      {productos.map((producto) => (
                        <li
                          key={producto.producto_id}
                          className="flex justify-between items-center text-gray-700 transition-colors duration-200 py-1 capitalize group/item"
                        >
                          <span className="font-medium group-hover/item:translate-x-1 transition-transform duration-200">
                            {producto.nombre}
                          </span>
                          <span className="bg-gray-100 text-gray-700 font-semibold px-2 py-1 rounded-full text-sm group-hover/item:scale-110 transition-transform duration-200">
                            ×{producto.cantidad}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
