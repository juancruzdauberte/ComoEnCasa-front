import { useEffect, useState } from "react";
import { useCreateOrderMutation } from "../../hooks/useOrder";
import { useCategorys, useProductsByCategory } from "../../hooks/useProduct";
import { useForm } from "@tanstack/react-form";
import { agruparProductosPorCategoria } from "../../utils/utils";
import type { CreateUpdateOrderResponse } from "../../types/types";
import { useCLient } from "../../hooks/useClient";
import { toast } from "sonner";
import { Spinner } from "../../common/widget/Spinner";
import { TrashIcon } from "@/components/common/widget/TrashIcon";

export const CreateOrder = () => {
  const { createOrderMutate, isPending } = useCreateOrderMutation();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [phone, setPhone] = useState<string>("");
  const [cantidadInput, setCantidadInput] = useState<{ [id: number]: string }>(
    {}
  );
  const { data: categories } = useCategorys();
  const { data: products } = useProductsByCategory(selectedCategory);
  const { data: allProducts } = useProductsByCategory(null);
  const { data: client } = useCLient(phone);
  const form = useForm({
    defaultValues: {
      observacion: null,
      hora_entrega: null,
      domicilio: "",
      estado: "preparando",
      productos: [],
      monto: null,
      nombre_cliente: "",
      metodo_pago: "",
      apellido_cliente: "",
      telefono_cliente: "",
    } as CreateUpdateOrderResponse,
    onSubmit: ({ value, formApi }) => {
      const domicilioFinal =
        value.domicilio && value.domicilio.trim() !== ""
          ? value.domicilio
          : "busca";

      const productosConvertidos = value.productos.map((p) => ({
        producto_id: p.producto_id,
        cantidad: Number(p.cantidad),
      }));

      const order = {
        ...value,
        domicilio: domicilioFinal,
        productos: productosConvertidos,
      };

      createOrderMutate(order);
      formApi.reset();
    },
  });

  useEffect(() => {
    if (client && client.nombre && client.apellido) {
      form.setFieldValue("nombre_cliente", client.nombre);
      form.setFieldValue("apellido_cliente", client.apellido);
      toast.info(
        `Se ha encontrado un cliente con el numero ${phone}. Cliente: ${client.nombre} ${client.apellido}`
      );
    }
  }, [client, form, phone]);

  if (isPending)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-transparent z-50">
        <Spinner text="Creando pedido..." />
      </div>
    );

  return (
    <section className="w-full flex flex-col gap-8 items-center">
      <div>
        <h1 className="text-center text-3xl font-bold mt-7 mb-2">
          Crear pedido
        </h1>
        <em>
          Los campos <span className="text-red-500">*</span> son requeridos
        </em>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="flex flex-col gap-5"
      >
        <div className="flex gap-10">
          <form.Field
            name="nombre_cliente"
            validators={{
              onSubmit: ({ value }) => {
                if (!value) return "Este campo es obligatorio";
              },
            }}
          >
            {(field) => (
              <div>
                <label
                  htmlFor="nombre_cliente"
                  className="block font-semibold mb-1"
                >
                  {" "}
                  <span className="text-red-500 mr-1">*</span>
                  Nombre:
                </label>
                <div className="flex flex-col">
                  <input
                    id="nombre_cliente"
                    type="text"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="border p-2 rounded "
                  />
                  {field.state.meta.errors.length > 0 && (
                    <em className="text-red-600 text-sm">
                      {field.state.meta.errors.join(", ")}
                    </em>
                  )}
                </div>
              </div>
            )}
          </form.Field>

          <form.Field
            name="apellido_cliente"
            validators={{
              onSubmit: ({ value }) => {
                if (!value) return "Este campo es obligatorio";
              },
            }}
          >
            {(field) => (
              <div>
                <label className="block font-semibold mb-1">
                  {" "}
                  <span className="text-red-500 mr-1">*</span>Apellido:
                </label>
                <div className="flex flex-col">
                  <input
                    type="text"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="border p-2  rounded"
                  />

                  {field.state.meta.errors.length > 0 && (
                    <em className="text-red-600 text-sm">
                      {field.state.meta.errors.join(", ")}
                    </em>
                  )}
                </div>
              </div>
            )}
          </form.Field>

          <form.Field
            name="telefono_cliente"
            validators={{
              onSubmit: ({ value }) => {
                if (!value) return "Este campo es obligatorio";
                if (value?.length !== 10)
                  return "Debe contener exactamente 10 dígitos";
              },
            }}
          >
            {(field) => (
              <div>
                <label className="block font-semibold mb-1">
                  {" "}
                  <span className="text-red-500 mr-1">*</span>Teléfono:
                </label>
                <div className="flex flex-col">
                  <input
                    type="text"
                    maxLength={10}
                    minLength={10}
                    value={field.state.value}
                    onChange={(e) => {
                      const soloNumeros = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 10);
                      field.handleChange(soloNumeros);
                      setPhone(soloNumeros);
                    }}
                    className="border p-2  rounded"
                  />

                  {field.state.meta.errors.length > 0 && (
                    <em className="text-red-600 text-sm">
                      {field.state.meta.errors.join(", ")}
                    </em>
                  )}
                </div>
              </div>
            )}
          </form.Field>

          <form.Field name="domicilio">
            {(field) => (
              <div>
                <label className="block font-semibold mb-1">
                  {" "}
                  <span className="text-red-500 mr-1">*</span> Domicilio:
                </label>

                <input
                  type="text"
                  value={field.state.value!}
                  onChange={(e) =>
                    field.handleChange(
                      e.target.value === "" ? null : e.target.value
                    )
                  }
                  className="border p-2  rounded w-[270px]"
                />
              </div>
            )}
          </form.Field>
        </div>

        <div className="flex gap-10">
          <form.Field
            name="monto"
            validators={{
              onSubmit: ({ value }) => {
                if (!value) return "Este campo es obligatorio";
              },
            }}
          >
            {(field) => (
              <div>
                <label className="block font-semibold mb-1">
                  {" "}
                  <span className="text-red-500 mr-1">*</span>Monto:
                </label>
                <div className="flex flex-col">
                  <input
                    type="text"
                    value={
                      field.state.value! &&
                      new Intl.NumberFormat("es-AR", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(field.state.value)
                    }
                    onChange={(e) => {
                      const soloNumeros = e.target.value.replace(/\D/g, "");
                      field.handleChange(Number(soloNumeros));
                    }}
                    className="border p-2 rounded "
                  />
                  {field.state.meta.errors.length > 0 && (
                    <em className="text-red-600 text-sm">
                      {field.state.meta.errors.join(", ")}
                    </em>
                  )}
                </div>
              </div>
            )}
          </form.Field>

          <form.Field
            name="metodo_pago"
            validators={{
              onSubmit: ({ value }) => {
                if (!value) return "Este campo es obligatorio";
              },
            }}
          >
            {(field) => (
              <div>
                <label className="block font-semibold mb-1">
                  {" "}
                  <span className="text-red-500 mr-1">*</span>Método pago:
                </label>
                <div className="flex flex-col">
                  <select
                    value={field.state.value}
                    onChange={(e) =>
                      field.setValue(
                        e.target.value as "efectivo" | "transferencia" | ""
                      )
                    }
                    className="border p-2 rounded"
                  >
                    <option value="">Seleccionar</option>
                    <option value="transferencia">Transferencia</option>
                    <option value="efectivo">Efectivo</option>
                  </select>

                  {field.state.meta.errors.length > 0 && (
                    <em className="text-red-600 text-sm">
                      {field.state.meta.errors.join(", ")}
                    </em>
                  )}
                </div>
              </div>
            )}
          </form.Field>

          <form.Field name="hora_entrega">
            {(field) => (
              <div>
                <label className="block font-semibold mb-1">
                  Hora entrega:
                </label>
                <input
                  type="time"
                  value={field.state.value ?? ""}
                  onChange={(e) => field.handleChange(e.target.value || null)}
                  className="border p-2  rounded"
                />
              </div>
            )}
          </form.Field>

          <form.Field name="observacion">
            {(field) => (
              <div>
                <label className="block font-semibold mb-1">Observación:</label>
                <textarea
                  value={field.state.value ?? ""}
                  onChange={(e) => field.handleChange(e.target.value || null)}
                  className="border p-2 rounded w-[410px]"
                />
              </div>
            )}
          </form.Field>
        </div>

        <form.Field
          name="productos"
          validators={{
            onSubmit: ({ value }) => {
              if (!Array.isArray(value) || value.length === 0)
                return "Debes seleccionar al menos un producto";
            },
          }}
        >
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
                  { producto_id, cantidad: 0 },
                ]);
              }
            };

            const cambiarCantidad = (
              producto_id: number,
              nuevaCantidad: string
            ) => {
              setCantidadInput((prev) => ({
                ...prev,
                [producto_id]: nuevaCantidad,
              }));

              const cantidadNum =
                nuevaCantidad === "" ? 0 : Number(nuevaCantidad);

              if (cantidadNum < 1 && nuevaCantidad !== "") return;

              field.handleChange(
                productosSeleccionados.map((p) =>
                  p.producto_id === producto_id
                    ? { ...p, cantidad: cantidadNum }
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
              <div className="flex gap-10 pt-5">
                <div className="flex gap-7">
                  <div>
                    <label className="block font-semibold">
                      {" "}
                      <span className="text-red-500 mr-1">*</span>Categoría
                    </label>
                    <select
                      id="categoria"
                      className="border p-2  rounded capitalize"
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
                  <div className="flex flex-col">
                    <label
                      className={`font-semibold ${
                        !selectedCategory && "text-gray-500"
                      }`}
                    >
                      {" "}
                      <span className="text-red-500 mr-1">*</span>
                      Productos
                    </label>
                    <select
                      className="border p-2 rounded capitalize"
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
                </div>

                <div className="">
                  <h4 className="font-bold mb-2">Productos seleccionados:</h4>

                  {Object.entries(productosAgrupados).length === 0 && (
                    <p className="text-gray-600">
                      No hay productos seleccionados.
                    </p>
                  )}

                  <div className="flex gap-10">
                    {Object.entries(productosAgrupados).map(
                      ([categoria, productos]) => (
                        <div key={categoria} className="mb-4">
                          <h5 className="font-semibold mb-2 capitalize">
                            {categoria}
                          </h5>
                          {productos.map(({ producto }) => (
                            <div
                              key={producto.id}
                              className="flex items-center gap-4 p-2 border rounded mb-2"
                            >
                              <span className="flex-1 capitalize">
                                {producto.nombre}
                              </span>
                              <input
                                value={cantidadInput[producto.id] ?? ""}
                                onChange={(e) =>
                                  cambiarCantidad(
                                    producto.id,
                                    e.target.value.replace(/\D/g, "")
                                  )
                                }
                                className="w-14 border px-2 py-1 rounded"
                                required
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  quitarProducto(producto.id);
                                  toast.success(
                                    "Producto eliminado del pedido"
                                  );
                                }}
                                className="text-red-600 hover:text-red-400"
                              >
                                <TrashIcon size={20} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )
                    )}
                  </div>
                </div>
                {field.state.meta.errors.length > 0 && (
                  <em className="text-red-600 text-sm">
                    {field.state.meta.errors.join(", ")}
                  </em>
                )}
              </div>
            );
          }}
        </form.Field>

        <button
          type="submit"
          className="absolute top-[520px] w-48 bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition"
        >
          Crear Pedido
        </button>
      </form>
    </section>
  );
};
