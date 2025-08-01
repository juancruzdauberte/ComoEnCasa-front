import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { modalStore } from "../store/modalStore";
import { useCategorys, useProductsByCategory } from "../hooks/useProduct";
import { useForm } from "@tanstack/react-form";
import type { CreateOrderResponse } from "../types/types";
import { agruparProductosPorCategoria } from "../utils/utils";

export const CreateOrderModal = () => {
  const { setIsCreateOpen } = modalStore();

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const { data: categories } = useCategorys();
  const { data: products } = useProductsByCategory(selectedCategory);
  const { data: allProducts } = useProductsByCategory(null);

  const form = useForm({
    defaultValues: {
      observacion: "",
      hora_entrega: "",
      domicilio: "",
      productos: [] as { producto_id: number; cantidad: number }[],
      monto: 0,
      nombre_cliente: "",
      metodo_pago: "efectivo",
      apellido_cliente: "",
      telefono_cliente: "",
    } as CreateOrderResponse,
  });

  // Función para agrupar productos seleccionados por categoría

  return (
    <div className="bg-white rounded-2xl shadow-lg w-full max-w-5xl p-6 relative animate-fadeIn text-black">
      <button
        onClick={() => setIsCreateOpen(false)}
        className="absolute top-4 right-5 text-black transition hover:text-slate-600"
        aria-label="Cerrar modal"
      >
        <CgClose size={30} />
      </button>

      <section>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          noValidate
        >
          {/* Nombre del cliente */}
          <form.Field name="nombre_cliente">
            {(field) => (
              <div className="mb-4">
                <label
                  htmlFor="nombre_cliente"
                  className="block font-semibold mb-1"
                >
                  Nombre del cliente
                </label>
                <input
                  id="nombre_cliente"
                  type="text"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="border p-2 w-full rounded"
                  required
                />
              </div>
            )}
          </form.Field>

          {/* Select para elegir categoría */}
          <div className="mb-4">
            <label htmlFor="categoria" className="block font-semibold mb-1">
              Categoría
            </label>
            <select
              id="categoria"
              className="border p-2 w-full rounded"
              value={selectedCategory ?? ""}
              onChange={(e) => {
                const catId = e.target.value ? Number(e.target.value) : null;
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

          {/* Campo productos: select productos + lista productos seleccionados agrupados */}
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
              };

              return (
                <div className="space-y-4">
                  {/* Select para productos según categoría */}
                  <div>
                    <label className="font-semibold">Productos</label>
                    <select
                      className="border p-2 rounded ml-2 w-full"
                      onChange={(e) => {
                        const productoId = Number(e.target.value);
                        if (productoId) agregarProducto(productoId);
                        e.currentTarget.value = ""; // reset select
                      }}
                      defaultValue=""
                    >
                      <option value="">Seleccionar producto</option>
                      {products?.map((producto) => (
                        <option key={producto.id} value={producto.id}>
                          {producto.nombre}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Lista agrupada de productos seleccionados por categoría */}
                  <div className="mt-4">
                    <h4 className="font-bold mb-2">
                      Productos seleccionados por categoría:
                    </h4>

                    {Object.entries(productosAgrupados).length === 0 && (
                      <p className="text-gray-600">
                        No hay productos seleccionados.
                      </p>
                    )}

                    {Object.entries(productosAgrupados).map(
                      ([categoria, productos]) => (
                        <div key={categoria} className="mb-4">
                          <h5 className="font-semibold mb-2">{categoria}</h5>
                          {productos.map(({ producto, cantidad }) => (
                            <div
                              key={producto.id}
                              className="flex items-center gap-4 p-2 border rounded mb-2"
                            >
                              <span className="flex-1">{producto.nombre}</span>
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
                                className="w-20 border px-2 py-1 rounded"
                              />
                              <button
                                type="button"
                                onClick={() => quitarProducto(producto.id)}
                                className="text-red-600 font-semibold"
                              >
                                Quitar
                              </button>
                            </div>
                          ))}
                        </div>
                      )
                    )}
                  </div>
                </div>
              );
            }}
          </form.Field>

          {/* Aquí podés agregar más campos del formulario según necesidad */}

          <button
            type="submit"
            className="mt-6 bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition"
          >
            Crear Pedido
          </button>
        </form>
      </section>
    </div>
  );
};
