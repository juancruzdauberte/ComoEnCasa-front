import { useState } from "react";
import {
  useOrder,
  useRemoveProductFromOrder,
  useUpdateOrderMutation,
} from "../../hooks/useOrder";
import { useCategorys, useProductsByCategory } from "../../hooks/useProduct";
import type { CreateUpdateOrderResponse } from "../../types/types";
import { useForm } from "@tanstack/react-form";
import { agruparProductosPorCategoria } from "../../utils/utils";
import { useParams } from "react-router-dom";
import { Spinner } from "../../common/widget/Spinner";
import { TrashIcon } from "../../common/widget/TrashIcon";
import {
  ShoppingBag,
  MapPin,
  User2,
  DollarSign,
  CreditCard,
  Clock,
  MessageSquare,
  Package,
  CheckCircle2,
  AlertCircle,
  Save,
} from "lucide-react";

export const EditOrder = () => {
  const { id } = useParams();
  const orderId = Number(id);
  const { data: order } = useOrder(orderId);
  const { updateOrderMutate, isPending } = useUpdateOrderMutation();
  const { removeProduct } = useRemoveProductFromOrder();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const { data: categories } = useCategorys();
  const { data: products } = useProductsByCategory(selectedCategory);
  const { data: allProducts } = useProductsByCategory(null);

  const form = useForm({
    defaultValues: {
      observacion: order?.observacion,
      hora_entrega: order?.hora_entrega,
      domicilio: order?.domicilio,
      productos: order?.productos,
      estado: order?.estado,
      monto: order?.monto,
      metodo_pago: order?.metodo_pago,
      apellido_cliente: order?.apellido_cliente,
    } as CreateUpdateOrderResponse,
    onSubmit: ({ value }) => {
      const productosFormateados = value.productos.map((producto) => ({
        producto_id: producto.producto_id,
        cantidad: producto.cantidad,
      }));

      const order = {
        ...value,
        productos: productosFormateados,
      };

      updateOrderMutate({ id: orderId, data: order });
    },
  });

  if (!order)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-900/20 to-purple-900/20 backdrop-blur-md z-50">
        <Spinner text="Cargando pedido..." />
      </div>
    );

  if (isPending)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-900/20 to-purple-900/20 backdrop-blur-md z-50">
        <Spinner text={`Actualizando pedido ${orderId}...`} />
      </div>
    );

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#FFFFFF] via-[#BDBDBD]/10 to-[#FFFFFF] py-12">
      <div className="container mx-auto px-6 max-w-5xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <ShoppingBag className="w-6 h-6 text-slate-600" />
              <h3 className="text-2xl font-bold text-slate-900">
                Pedido #{orderId}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <form.Field name="domicilio">
                {(field) => (
                  <div className="group">
                    <label className="flex items-center gap-2 font-semibold text-slate-700 mb-2 transition-colors">
                      <MapPin className="w-4 h-4" />
                      Domicilio
                    </label>
                    <input
                      type="text"
                      value={field.state.value!}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50/20 border-2 border-slate-200 rounded-xl focus:border-slate-500 transition-all duration-200 outline-none"
                    />
                  </div>
                )}
              </form.Field>

              <form.Field name="monto">
                {(field) => (
                  <div className="group">
                    <label className="flex items-center gap-2 font-semibold text-slate-700 mb-2 transition-colors">
                      <DollarSign className="w-4 h-4" />
                      Monto
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={
                          field.state.value
                            ? new Intl.NumberFormat("es-AR", {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              }).format(field.state.value)
                            : ""
                        }
                        onChange={(e) => {
                          const soloNumeros = e.target.value.replace(/\D/g, "");
                          field.handleChange(Number(soloNumeros));
                        }}
                        required
                        className="w-full px-4 py-3 bg-slate-50/20 border-2 border-slate-200 rounded-xl focus:border-slate-500  transition-all duration-200 outline-none"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                        $
                      </span>
                    </div>
                  </div>
                )}
              </form.Field>

              <form.Field name="apellido_cliente">
                {(field) => (
                  <div className="group">
                    <label className="flex items-center gap-2 font-semibold text-slate-700 mb-2 transition-colors">
                      <User2 className="w-4 h-4" />
                      Cliente
                    </label>
                    <input
                      type="text"
                      value={field.state.value!}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50/20 border-2 border-slate-200 rounded-xl focus:border-slate-500 transition-all duration-200 outline-none"
                    />
                  </div>
                )}
              </form.Field>

              <form.Field name="metodo_pago">
                {(field) => (
                  <div className="group">
                    <label className="flex items-center gap-2 font-semibold text-slate-700 mb-2 transition-colors">
                      <CreditCard className="w-4 h-4" />
                      Método de Pago
                    </label>
                    <select
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(
                          e.target.value as "efectivo" | "transferencia" | ""
                        )
                      }
                      required
                      className="w-full px-4 py-3 bg-slate-50/20 border-2 border-slate-200 rounded-xl focus:border-slate-500  transition-all duration-200 outline-none cursor-pointer"
                    >
                      <option value="">Seleccionar</option>
                      <option value="transferencia">💳 Transferencia</option>
                      <option value="efectivo">💵 Efectivo</option>
                    </select>
                  </div>
                )}
              </form.Field>

              <div className="flex flex-col">
                <label className="flex items-center gap-2 font-semibold text-slate-700 mb-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Estado de Pago
                </label>
                <div
                  className={`px-2 py-3 rounded-xl border-2 font-semibold text-center transition-all ${
                    !order.fecha_pago
                      ? "bg-amber-50 border-amber-300 text-amber-700"
                      : "bg-emerald-50 border-emerald-300 text-emerald-700"
                  }`}
                >
                  {!order.fecha_pago ? (
                    <span className="flex items-center justify-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Pendiente
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      Realizado
                    </span>
                  )}
                </div>
              </div>

              <form.Field name="estado">
                {(field) => (
                  <div className="group">
                    <label className="flex items-center gap-2 font-semibold text-slate-700 mb-2 transition-colors">
                      <Package className="w-4 h-4" />
                      Estado del Pedido
                    </label>
                    <select
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(
                          e.target.value as
                            | "preparando"
                            | "listo"
                            | "entregado"
                            | "cancelado"
                        )
                      }
                      className="w-full px-4 py-3 bg-slate-50/20 border-2 border-slate-200 rounded-xl focus:border-slate-500  transition-all duration-200 outline-none cursor-pointer capitalize"
                    >
                      <option value="preparando">🔄 Preparando</option>
                      <option value="listo">✅ Listo</option>
                      <option value="entregado">📦 Entregado</option>
                      <option value="cancelado">❌ Cancelado</option>
                    </select>
                  </div>
                )}
              </form.Field>

              <form.Field name="hora_entrega">
                {(field) => (
                  <div className="group">
                    <label className="flex items-center gap-2 font-semibold text-slate-700 mb-2 transition-colors">
                      <Clock className="w-4 h-4" />
                      Hora de Entrega
                    </label>
                    <input
                      type="time"
                      value={field.state.value ?? ""}
                      onChange={(e) =>
                        field.handleChange(e.target.value || null)
                      }
                      className="w-full px-4 py-3 bg-slate-50/20 border-2 border-slate-200 rounded-xl focus:border-slate-500  transition-all duration-200 outline-none"
                    />
                  </div>
                )}
              </form.Field>
            </div>

            <form.Field name="observacion">
              {(field) => (
                <div className="mt-6 group">
                  <label className="flex items-center gap-2 font-semibold text-slate-700 mb-2 transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    Observación
                  </label>
                  <textarea
                    value={field.state.value ?? ""}
                    onChange={(e) => field.handleChange(e.target.value || null)}
                    rows={3}
                    className="w-full px-4 py-3 bg-slate-50/20 border-2 border-slate-200 rounded-xl focus:border-slate-500  transition-all duration-200 outline-none resize-none"
                    placeholder="Notas adicionales..."
                  />
                </div>
              )}
            </form.Field>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2 mt-5">
              <div className="group">
                <label className="block font-semibold text-slate-700 mb-2 transition-colors">
                  Categoría
                </label>
                <select
                  className="w-full px-4 py-3 bg-slate-50/20 border-2 border-slate-200 rounded-xl focus:border-slate-500  transition-all duration-200 outline-none capitalize cursor-pointer"
                  value={selectedCategory ?? ""}
                  onChange={(e) => {
                    const catId = e.target.value
                      ? Number(e.target.value)
                      : null;
                    setSelectedCategory(catId);
                  }}
                >
                  <option value="">Todas las categorías</option>
                  {categories?.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <form.Field name="productos">
                {(field) => {
                  const productosSeleccionados = field.state.value || [];
                  const productosAgrupados = agruparProductosPorCategoria(
                    productosSeleccionados,
                    allProducts ?? []
                  );

                  const agregarProducto = (producto_id: number) => {
                    if (
                      !productosSeleccionados.find(
                        (p) => p.producto_id === producto_id
                      )
                    ) {
                      field.handleChange([
                        ...productosSeleccionados,
                        { producto_id, cantidad: 1 },
                      ]);
                    }
                  };

                  const cambiarCantidad = (
                    producto_id: number,
                    nuevaCantidad: number
                  ) => {
                    if (nuevaCantidad < 1) return;
                    field.handleChange(
                      productosSeleccionados.map((p) =>
                        p.producto_id === producto_id
                          ? { ...p, cantidad: nuevaCantidad }
                          : p
                      )
                    );
                  };

                  const quitarProducto = (producto_id: number) => {
                    field.handleChange(
                      productosSeleccionados.filter(
                        (p) => p.producto_id !== producto_id
                      )
                    );
                    removeProduct({
                      pedidoId: orderId,
                      productoId: producto_id,
                    });
                  };

                  return (
                    <>
                      <div className="group">
                        <label
                          className={`block font-semibold mb-2 transition-colors ${
                            !selectedCategory
                              ? "text-slate-400"
                              : "text-slate-700"
                          }`}
                        >
                          Seleccionar Producto
                        </label>
                        <select
                          className="w-full px-4 py-3 bg-slate-50/20 border-2 border-slate-200 rounded-xl focus:border-slate-500  transition-all duration-200 outline-none capitalize cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                          onChange={(e) => {
                            const productoId = Number(e.target.value);
                            if (productoId) agregarProducto(productoId);
                            e.currentTarget.value = "";
                          }}
                          defaultValue=""
                          disabled={!selectedCategory}
                        >
                          <option value="">Seleccionar producto</option>
                          {products?.map((producto) => (
                            <option key={producto.id} value={producto.id}>
                              {producto.nombre}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="md:col-span-2 mt-6">
                        {Object.entries(productosAgrupados).length === 0 ? (
                          <div className="text-center py-12 bg-slate-50/20 rounded-2xl border-2 border-dashed border-slate-300">
                            <Package className="w-16 h-16 mx-auto text-slate-300 mb-3" />
                            <p className="text-slate-500 font-medium">
                              No hay productos seleccionados
                            </p>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                            {Object.entries(productosAgrupados).map(
                              ([categoria, productos]) => (
                                <div
                                  key={categoria}
                                  className="space-y-3 bg-gray-300/20 p-2.5 rounded-xl w-[230px] h-fit"
                                >
                                  <h5 className="font-bold text-slate-600 capitalize flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-slate-600"></div>
                                    {categoria}
                                  </h5>
                                  {productos.map(({ producto, cantidad }) => (
                                    <div
                                      key={producto.id}
                                      className="flex items-center gap-3 p-3 bg-white border-2 border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-lg transition-all duration-200"
                                    >
                                      <span className="flex-1 font-medium capitalize text-slate-700">
                                        {producto.nombre}
                                      </span>
                                      <input
                                        type="number"
                                        min={1}
                                        value={cantidad}
                                        onChange={(e) =>
                                          cambiarCantidad(
                                            producto.id,
                                            Number(e.target.value)
                                          )
                                        }
                                        className="w-14 p-1 text-center border-2 border-slate-200 rounded-lg focus:border-slate-500 focus:ring-2 focus:ring-indigo-100 transition-all outline-none"
                                      />
                                      <button
                                        type="button"
                                        onClick={() =>
                                          quitarProducto(producto.id)
                                        }
                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                                      >
                                        <TrashIcon size={20} />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    </>
                  );
                }}
              </form.Field>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="group relative px-10 py-4 bg-green-500 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
              <span className="relative flex items-center gap-3">
                <Save className="w-6 h-6" />
                Guardar Cambios
              </span>
            </button>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes fade-in-delay {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-slide-down {
          animation: slide-down 0.6s ease-out;
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-fade-in-delay {
          animation: fade-in-delay 0.6s ease-out 0.2s both;
        }
      `}</style>
    </section>
  );
};
