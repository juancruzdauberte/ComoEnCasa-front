import { useState } from "react";
import { useCreateOrderMutation } from "../../hooks/useOrder";
import { useCategorys, useProductsByCategory } from "../../hooks/useProduct";
import { useForm } from "@tanstack/react-form";
import { agruparProductosPorCategoria } from "../../utils/utils";
import type { CreateUpdateOrderResponse } from "../../types/types";
import { toast } from "sonner";
import { Spinner } from "../../common/widget/Spinner";
import { TrashIcon } from "@/components/common/widget/TrashIcon";
import {
  ShoppingBag,
  DollarSign,
  CreditCard,
  Clock,
  MessageSquare,
  MapPin,
  User2Icon,
  Package,
} from "lucide-react";

export const CreateOrder = () => {
  const { createOrderMutate, isPending } = useCreateOrderMutation();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [cantidadInput, setCantidadInput] = useState<{ [id: number]: string }>(
    {}
  );
  const { data: categories } = useCategorys();
  const { data: products } = useProductsByCategory(selectedCategory);
  const { data: allProducts } = useProductsByCategory(null);

  const form = useForm({
    defaultValues: {
      observacion: null,
      hora_entrega: null,
      domicilio: null,
      estado: "preparando",
      productos: [],
      apellido_cliente: null,
      monto: null,
      metodo_pago: "",
    } as CreateUpdateOrderResponse,
    onSubmit: ({ value, formApi }) => {
      const productosConvertidos = value.productos.map((p) => ({
        producto_id: p.producto_id,
        cantidad: Number(p.cantidad),
      }));

      const order = {
        ...value,
        productos: productosConvertidos,
      };

      createOrderMutate(order);
      formApi.reset();
    },
  });

  if (isPending)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm z-50">
        <Spinner text="Creando pedido..." />
      </div>
    );

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#FFFFFF] via-[#BDBDBD]/10 to-[#FFFFFF] py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header animado */}
        <div className="text-center mb-12 animate-slide-down">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-black rounded-2xl shadow-lg">
              <ShoppingBag className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-black to-gray-500 bg-clip-text text-transparent">
              Crear Pedido
            </h1>
          </div>
          <p className="text-slate-600 flex items-center justify-center gap-2">
            Los campos con <span className="text-red-500 font-semibold">*</span>{" "}
            son requeridos
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-8"
        >
          {/* Card principal con glassmorphism */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 animate-fade-in">
            {/* Información básica */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <form.Field name="domicilio">
                {(field) => (
                  <div className="group">
                    <label className="flex items-center gap-2 font-semibold text-slate-700 mb-2">
                      <MapPin className="w-5 h-5" />
                      Domicilio
                    </label>
                    <input
                      type="text"
                      value={field.state.value!}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="w-full max-w-sm px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl 
                               focus:border-slate-500   
                               transition-all duration-200 outline-none"
                      placeholder="Ingrese el domicilio de entrega"
                    />
                  </div>
                )}
              </form.Field>

              <form.Field
                name="apellido_cliente"
                validators={{
                  onSubmit: ({ value }) => {
                    const addressValue = form.getFieldValue("domicilio");
                    if (!value && !addressValue)
                      return "Campo obligatorio si domicilio es vacío";
                  },
                }}
              >
                {(field) => (
                  <div className="group">
                    <label className="flex items-center gap-2 font-semibold text-slate-700 mb-2">
                      <User2Icon className="w-5 h-5" />
                      Cliente
                    </label>
                    <input
                      type="text"
                      value={field.state.value!}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="w-full max-w-sm px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl 
                               focus:border-slate-500   
                               transition-all duration-200 outline-none"
                      placeholder="Ingrese el apellido del cliente"
                    />
                    {field.state.meta.errors.length > 0 && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1 animate-shake">
                        <span>⚠</span> {field.state.meta.errors.join(", ")}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>
            </div>

            {/* Información de pago */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <form.Field
                name="monto"
                validators={{
                  onSubmit: ({ value }) => {
                    if (!value) return "Este campo es obligatorio";
                  },
                }}
              >
                {(field) => (
                  <div className="group">
                    <label className="flex items-center gap-2 font-semibold text-slate-700 mb-2 ">
                      <DollarSign className="w-5 h-5" />
                      <span className="text-red-500">*</span> Monto
                    </label>
                    <div className="relative">
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
                        className="w-full max-w-sm px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl 
                                 focus:border-slate-500 
                                 transition-all duration-200 outline-none "
                        placeholder="0"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                        $
                      </span>
                    </div>
                    {field.state.meta.errors.length > 0 && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <span>⚠</span> {field.state.meta.errors.join(", ")}
                      </p>
                    )}
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
                  <div className="group">
                    <label className="flex items-center gap-2 font-semibold text-slate-700 mb-2 group-hover:text-slate-900 transition-colors">
                      <CreditCard className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <span className="text-red-500">*</span> Método de pago
                    </label>
                    <div className="relative">
                      <select
                        value={field.state.value}
                        onChange={(e) =>
                          field.setValue(
                            e.target.value as "efectivo" | "transferencia" | ""
                          )
                        }
                        className="w-full max-w-sm px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl 
                                 focus:border-slate-500 focus:bg-white focus:shadow-lg focus:scale-[1.02]
                                 hover:border-slate-300 hover:shadow-md appearance-none
                                 transition-all duration-300 outline-none cursor-pointer font-medium
                                 bg-no-repeat bg-[length:1.2rem] bg-[right_0.75rem_center]
                                 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23475569%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')]"
                      >
                        <option value="">Seleccionar método</option>
                        <option value="transferencia">💳 Transferencia</option>
                        <option value="efectivo">💵 Efectivo</option>
                      </select>
                      <div
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-slate-500/0 to-slate-500/0 
                                    group-hover:from-slate-500/5 group-hover:to-transparent 
                                    transition-all duration-300 pointer-events-none"
                      ></div>
                    </div>
                    {field.state.meta.errors.length > 0 && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1 animate-shake">
                        <span>⚠</span> {field.state.meta.errors.join(", ")}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>
            </div>

            {/* Selección de productos */}
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
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Package className="w-6 h-6 text-slate-600" />
                      <h3 className="text-xl font-bold text-slate-800">
                        <span className="text-red-500">*</span> Productos
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="group">
                        <label className="block font-semibold text-slate-700 mb-2 group-hover:text-slate-900 transition-colors">
                          Categoría
                        </label>
                        <div className="relative">
                          <select
                            className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl 
                                     focus:border-slate-500 focus:bg-white focus:shadow-lg focus:scale-[1.02]
                                     hover:border-slate-300 hover:shadow-md appearance-none
                                     transition-all duration-300 outline-none capitalize cursor-pointer font-medium
                                     bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23475569%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] 
                                     bg-no-repeat bg-[length:1.2rem] bg-[right_0.75rem_center]"
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
                          <div
                            className="absolute inset-0 rounded-xl bg-gradient-to-r from-slate-500/0 to-slate-500/0 
                                        group-hover:from-slate-500/5 group-hover:to-transparent 
                                        transition-all duration-300 pointer-events-none"
                          ></div>
                        </div>
                      </div>

                      <div className="group">
                        <label
                          className={`block font-semibold mb-2 transition-all duration-300 ${
                            !selectedCategory
                              ? "text-slate-400"
                              : "text-slate-700 group-hover:text-slate-900"
                          }`}
                        >
                          Producto
                        </label>
                        <div className="relative">
                          <select
                            className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl 
                                     focus:border-slate-500 focus:bg-white focus:shadow-lg focus:scale-[1.02]
                                     hover:border-slate-300 hover:shadow-md appearance-none
                                     transition-all duration-300 outline-none capitalize cursor-pointer font-medium
                                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:scale-100
                                     bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23475569%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] 
                                     bg-no-repeat bg-[length:1.2rem] bg-[right_0.75rem_center]"
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
                          <div
                            className={`absolute inset-0 rounded-xl bg-gradient-to-r from-slate-500/0 to-slate-500/0 
                                        transition-all duration-300 pointer-events-none ${
                                          selectedCategory
                                            ? "group-hover:from-slate-500/5 group-hover:to-transparent"
                                            : ""
                                        }`}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Lista de productos seleccionados */}
                    <div className="mt-6">
                      {Object.entries(productosAgrupados).length === 0 ? (
                        <div className="text-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300">
                          <Package className="w-16 h-16 mx-auto text-slate-300 mb-3" />
                          <p className="text-slate-500 font-medium">
                            No hay productos seleccionados
                          </p>
                          <p className="text-slate-400 text-sm">
                            Selecciona productos para agregar al pedido
                          </p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                          {Object.entries(productosAgrupados).map(
                            ([categoria, productos]) => (
                              <div key={categoria} className="space-y-3">
                                <h4 className="font-bold text-slate-600 capitalize flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-slate-600"></div>
                                  {categoria}
                                </h4>
                                {productos.map(({ producto }) => (
                                  <div
                                    key={producto.id}
                                    className="flex items-center w-[250px] gap-3 p-3 bg-white border-2 border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-lg transition-all duration-200"
                                  >
                                    <span className="flex-1 capitalize font-medium text-slate-700">
                                      {producto.nombre}
                                    </span>
                                    <input
                                      type="text"
                                      value={cantidadInput[producto.id] ?? ""}
                                      onChange={(e) =>
                                        cambiarCantidad(
                                          producto.id,
                                          e.target.value.replace(/\D/g, "")
                                        )
                                      }
                                      className="w-14 p-1 text-center border-2 border-slate-200 rounded-lg focus:border-slate-500  transition-all outline-none"
                                      placeholder="0"
                                      required
                                    />
                                    <button
                                      type="button"
                                      onClick={() => {
                                        quitarProducto(producto.id);
                                        toast.success("Producto eliminado");
                                      }}
                                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg 
                                             transition-colors duration-200"
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

                    {field.state.meta.errors.length > 0 && (
                      <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
                        <span>⚠</span> {field.state.meta.errors.join(", ")}
                      </p>
                    )}
                  </div>
                );
              }}
            </form.Field>
            <div className="flex gap-6 mt-5">
              <form.Field name="hora_entrega">
                {(field) => (
                  <div className="group w-1/3">
                    <label className="flex items-center gap-2 font-semibold text-slate-700 mb-2 group-hover:text-slate-900 transition-colors">
                      <Clock className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      Hora de entrega
                    </label>
                    <div className="relative">
                      <input
                        type="time"
                        value={field.state.value ?? ""}
                        onChange={(e) =>
                          field.handleChange(e.target.value || null)
                        }
                        className="w-full max-w-[200px] px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl 
                                 focus:border-slate-500 focus:bg-white focus:shadow-lg focus:scale-[1.02]
                                 hover:border-slate-300 hover:shadow-md
                                 transition-all duration-300 outline-none cursor-pointer"
                      />
                      <div
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-slate-500/0 to-slate-500/0 
                                    group-hover:from-slate-500/5 group-hover:to-transparent 
                                    transition-all duration-300 pointer-events-none"
                      ></div>
                    </div>
                  </div>
                )}
              </form.Field>
              <form.Field name="observacion">
                {(field) => (
                  <div className="group mb-8 w-full">
                    <label className="flex items-center gap-2 font-semibold text-slate-700 mb-2 ">
                      <MessageSquare className="w-5 h-5" />
                      Observaciones
                    </label>
                    <textarea
                      value={field.state.value ?? ""}
                      onChange={(e) =>
                        field.handleChange(e.target.value || null)
                      }
                      rows={3}
                      className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl 
                             focus:border-slate-500 
                             transition-all duration-200 outline-none resize-none"
                      placeholder="Notas adicionales sobre el pedido..."
                    />
                  </div>
                )}
              </form.Field>
            </div>
          </div>

          {/* Botón de envío */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="group relative px-10 py-4 bg-green-500
                       text-white font-bold text-lg rounded-2xl shadow-2xl 
                       hover:shadow-green-500/50 transition-all duration-300 
                       hover:scale-105 hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
              <span className="relative flex items-center gap-3">
                <ShoppingBag className="w-6 h-6" />
                Crear Pedido
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

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        .animate-slide-down {
          animation: slide-down 0.6s ease-out;
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }

        /* Estilos personalizados para inputs de tipo time */
        input[type="time"]::-webkit-calendar-picker-indicator {
          cursor: pointer;
          filter: opacity(0.6);
          transition: filter 0.2s;
        }

        input[type="time"]:hover::-webkit-calendar-picker-indicator {
          filter: opacity(1);
        }

        /* Estilos mejorados para options de select */
        select option {
          padding: 12px 16px;
          margin: 4px 0;
          background-color: #ffffff;
          color: #334155;
          font-weight: 500;
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        select option:hover {
          background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
          color: #0f172a;
          font-weight: 600;
          padding-left: 20px;
        }

        select option:checked {
          background: linear-gradient(135deg, #334155 0%, #475569 100%);
          color: #ffffff;
          font-weight: 600;
        }

        select option:disabled {
          color: #cbd5e1;
          background-color: #f8fafc;
          cursor: not-allowed;
        }

        /* Placeholder option styling */
        select option[value=""] {
          color: #94a3b8;
          font-style: italic;
        }

        /* Firefox specific styles */
        @-moz-document url-prefix() {
          select option {
            padding: 10px;
          }
          
          select option:hover {
            background-color: #f1f5f9;
          }
        }
      `}</style>
    </section>
  );
};
