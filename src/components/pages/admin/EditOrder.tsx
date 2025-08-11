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
      nombre_cliente: order?.nombre_cliente,
      metodo_pago: order?.metodo_pago,
      apellido_cliente: order?.apellido_cliente,
      telefono_cliente: order?.telefono_cliente,
    } as CreateUpdateOrderResponse,
    onSubmit: ({ value }) => {
      const productosFormateados = value.productos.map((producto) => ({
        producto_id: producto.producto_id,
        cantidad: producto.cantidad,
      }));
      const order = {
        observacion: value.observacion,
        hora_entrega: value.hora_entrega,
        metodo_pago: value.metodo_pago,
        monto: value.monto,
        estado: value.estado,
        domicilio: value.domicilio,
        productos: productosFormateados,
      };
      updateOrderMutate({ id: orderId, data: order });
    },
  });

  if (!order)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-transparent z-50">
        <Spinner text="Cargando pedido..." />
      </div>
    );

  if (isPending)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-transparent z-50">
        <Spinner text={`Actualizando pedido ${orderId}...`} />
      </div>
    );
  return (
    <section className="p-6 bg-white rounded shadow-md">
      <h1 className="text-center font-bold text-2xl">
        Editar pedido: {order?.id}
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-6 "
      >
        <div className="flex justify-between w-full">
          <div>
            <h3 className="text-lg font-bold mb-4">Datos del Cliente</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <form.Field name="nombre_cliente">
                {(field) => (
                  <div>
                    <label
                      htmlFor="nombre_cliente"
                      className="block text-sm font-semibold mb-1"
                    >
                      Nombre
                    </label>
                    <input
                      id="nombre_cliente"
                      type="text"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled
                    />
                  </div>
                )}
              </form.Field>

              <form.Field name="apellido_cliente">
                {(field) => (
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Apellido
                    </label>
                    <input
                      type="text"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled
                    />
                  </div>
                )}
              </form.Field>

              <form.Field name="telefono_cliente">
                {(field) => (
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Teléfono
                    </label>
                    <input
                      type="text"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled
                    />
                  </div>
                )}
              </form.Field>

              <form.Field name="domicilio">
                {(field) => (
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Domicilio
                    </label>
                    <input
                      type="text"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                )}
              </form.Field>

              <form.Field name="monto">
                {(field) => (
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Monto
                    </label>
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
                      className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                )}
              </form.Field>

              <form.Field name="metodo_pago">
                {(field) => (
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Método de Pago
                    </label>
                    <select
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(
                          e.target.value as "efectivo" | "transferencia" | ""
                        )
                      }
                      className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Seleccionar</option>
                      <option value="transferencia">Transferencia</option>
                      <option value="efectivo">Efectivo</option>
                    </select>
                  </div>
                )}
              </form.Field>

              <div className="flex items-center gap-2">
                <label className={`text-sm block  font-semibold mb-1`}>
                  Fecha pago:{" "}
                  <span
                    className={`text-sm font-semibold px-1 border rounded-md capitalize text-center  ${
                      !order.fecha_pago
                        ? "text-yellow-500 border-yellow-400 bg-yellow-100"
                        : "text-green-500 border-green-400 bg-green-100"
                    }`}
                  >
                    {!order.fecha_pago ? "Pendiente" : "Realizado"}
                  </span>
                </label>
              </div>

              <form.Field name="estado">
                {(field) => (
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Estado
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
                      className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="preparando">Preparando</option>
                      <option value="listo">Listo</option>
                      <option value="entregado">Entregado</option>
                      <option value="cancelado">Cancelado</option>
                    </select>
                  </div>
                )}
              </form.Field>

              <form.Field name="hora_entrega">
                {(field) => (
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Hora de Entrega
                    </label>
                    <input
                      type="time"
                      value={field.state.value ?? ""}
                      onChange={(e) =>
                        field.handleChange(e.target.value || null)
                      }
                      className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}
              </form.Field>
            </div>

            <form.Field name="observacion">
              {(field) => (
                <div className="mt-4">
                  <label className="block text-sm font-semibold mb-1">
                    Observación
                  </label>
                  <textarea
                    value={field.state.value ?? ""}
                    onChange={(e) => field.handleChange(e.target.value || null)}
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Escribe una observación..."
                  />
                </div>
              )}
            </form.Field>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Productos</h3>

            <div className="flex flex-col sm:flex-row gap-4 items-start">
              {/* Categoría */}
              <div className="flex flex-col w-full sm:w-1/3">
                <label className="font-semibold mb-1">Categoría</label>
                <select
                  id="categoria"
                  className="border p-2 rounded capitalize"
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

              {/* Selector de productos */}
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
                    <div className="w-full sm:w-2/3">
                      <label
                        className={`font-semibold mb-1 block ${
                          !selectedCategory && "text-gray-500"
                        }`}
                      >
                        Seleccionar Producto
                      </label>
                      <select
                        className="border p-2 rounded capitalize w-full"
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

                      <div className="mt-4 ">
                        {Object.entries(productosAgrupados).length === 0 ? (
                          <p className="text-gray-600">
                            No hay productos seleccionados.
                          </p>
                        ) : (
                          <div className="flex flex-wrap gap-2">
                            {Object.entries(productosAgrupados).map(
                              ([categoria, productos]) => (
                                <div key={categoria} className="capitalize">
                                  <h5 className="font-semibold mb-2">
                                    {categoria}
                                  </h5>
                                  {productos.map(({ producto, cantidad }) => (
                                    <div
                                      key={producto.id}
                                      className="flex items-center gap-4 p-3 border rounded mb-2"
                                    >
                                      <span className="flex-1 font-medium">
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
                                        className="w-14 border px-2 py-1 rounded"
                                      />
                                      <button
                                        type="button"
                                        onClick={() =>
                                          quitarProducto(producto.id)
                                        }
                                        className="text-red-600 font-semibold hover:text-red-400"
                                      >
                                        <TrashIcon size={23} />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                }}
              </form.Field>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 transition text-white py-2 px-6 rounded shadow"
          >
            Editar Pedido
          </button>
        </div>
      </form>
    </section>
  );
};
