import { useForm } from "@tanstack/react-form";
import type {
  CreateCategoryResponse,
  CreateProductResponse,
} from "../../types/types";
import {
  useCategorys,
  useCreateCategory,
  useCreateProduct,
  useDeleteCategory,
  useDeleteProduct,
  useProductsByCategory,
} from "../../hooks/useProduct";
import { useState } from "react";
import { toast } from "sonner";
import { Trash2Icon, Package, Tag, Plus, Minus } from "lucide-react";

export const ProductPage = () => {
  const [categoryForProductDelete, setCategoryForProductDelete] = useState<
    number | null
  >(null);
  const [categoryForCategoryDelete, setCategoryForCategoryDelete] = useState<
    number | null
  >(null);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );
  const { data: categories } = useCategorys();
  const { data: products } = useProductsByCategory();
  const { createCategoryMutation } = useCreateCategory();
  const { createProductMutation } = useCreateProduct();
  const { deleteProductMutate } = useDeleteProduct();
  const { deleteCategoryMutate } = useDeleteCategory();
  const selectedProduct = products?.find((p) => p.id === selectedProductId);

  const productForm = useForm({
    defaultValues: {
      nombre: "",
      categoria_id: 0,
    } as CreateProductResponse,
    onSubmit: ({ value, formApi }) => {
      createProductMutation({
        nombre: value.nombre,
        categoria_id: value.categoria_id,
      });

      formApi.reset();
    },
  });

  const categoryForm = useForm({
    defaultValues: { nombre: "" } as CreateCategoryResponse,
    onSubmit: ({ value, formApi }) => {
      createCategoryMutation({ nombre: value.nombre });
      formApi.reset();
    },
  });

  const ProductField = productForm.Field;
  const CategoryField = categoryForm.Field;

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#FFFFFF] via-[#BDBDBD]/10 to-[#FFFFFF]">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#000000] via-[#424242] to-[#000000] pt-16 pb-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" 
               style={{
                 backgroundImage: 'radial-gradient(circle, #FFFFFF 1px, transparent 1px)',
                 backgroundSize: '30px 30px'
               }}>
          </div>
        </div>

        <div className="absolute top-10 left-10 w-32 h-32 bg-[#BDBDBD]/10 rounded-full blur-3xl animate-pulse"></div>
        
        <div className="relative container mx-auto px-6">
          <div className="text-center space-y-6 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl 
                          bg-gradient-to-br from-[#FFFFFF]/20 to-[#BDBDBD]/10 backdrop-blur-sm
                          border-2 border-[#BDBDBD]/30 mb-4">
              <Package size={40} className="text-[#FFFFFF]" />
            </div>

            <h1 className="font-bold text-5xl md:text-6xl text-[#FFFFFF] drop-shadow-2xl">
              Productos y Categorías
            </h1>

            <div className="h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-[#BDBDBD] to-transparent"></div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C300,80 900,80 1200,0 L1200,120 L0,120 Z" 
                  className="fill-[#FFFFFF]"></path>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 -mt-10 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Columna Izquierda - Productos */}
          <div className="space-y-8 animate-slide-in-left">
            
            {/* Crear Producto */}
            <div className="bg-[#FFFFFF] rounded-2xl shadow-xl border-2 border-[#BDBDBD]/30 p-8
                          hover:shadow-2xl hover:shadow-[#424242]/10 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-[#BDBDBD]/30">
                <div className="p-2 bg-gradient-to-br from-[#000000] to-[#424242] rounded-lg">
                  <Plus size={24} className="text-[#FFFFFF]" />
                </div>
                <h2 className="font-bold text-2xl text-[#000000]">Crear Producto</h2>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  productForm.handleSubmit();
                }}
                className="flex flex-col gap-6"
              >
                <ProductField
                  name="categoria_id"
                  validators={{
                    onSubmit: ({ value }) => {
                      if (!value) return "Este campo es obligatorio";
                    },
                  }}
                >
                  {(field) => (
                    <div className="flex flex-col gap-2">
                      <label className="font-semibold text-[#424242] flex items-center gap-2">
                        <Tag size={18} />
                        Categoría
                      </label>
                      <select
                        className="border-2 border-[#BDBDBD]/50 p-3 rounded-xl capitalize
                                 focus:outline-none focus:ring-2 focus:ring-[#000000] focus:border-transparent
                                 bg-[#FFFFFF] text-[#424242] hover:border-[#757575] transition-all duration-300"
                        value={field.state.value ?? ""}
                        onChange={(e) => {
                          field.handleChange(Number(e.target.value));
                        }}
                      >
                        <option value="">Seleccionar categoría</option>
                        {categories?.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.nombre}
                          </option>
                        ))}
                      </select>
                      {field.state.meta.errors.length > 0 && (
                        <em className="text-red-600 text-sm flex items-center gap-1">
                          ⚠️ {field.state.meta.errors.join(", ")}
                        </em>
                      )}
                    </div>
                  )}
                </ProductField>

                <ProductField
                  name="nombre"
                  validators={{
                    onSubmit: ({ value }) => {
                      if (!value) return "Este campo es obligatorio";
                    },
                  }}
                >
                  {(field) => (
                    <div className="flex flex-col gap-2">
                      <label className="font-semibold text-[#424242] flex items-center gap-2">
                        <Package size={18} />
                        Nombre del Producto
                      </label>
                      <input
                        type="text"
                        value={field.state.value ?? ""}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Ej: Pizza Napolitana"
                        className="border-2 border-[#BDBDBD]/50 p-3 rounded-xl
                                 focus:outline-none focus:ring-2 focus:ring-[#000000] focus:border-transparent
                                 bg-[#FFFFFF] text-[#424242] placeholder:text-[#BDBDBD]
                                 hover:border-[#757575] transition-all duration-300"
                      />
                      {field.state.meta.errors.length > 0 && (
                        <em className="text-red-600 text-sm flex items-center gap-1">
                          ⚠️ {field.state.meta.errors.join(", ")}
                        </em>
                      )}
                    </div>
                  )}
                </ProductField>

                <button
                  className="bg-gradient-to-r from-[#000000] to-[#424242] hover:from-[#424242] hover:to-[#000000]
                           text-[#FFFFFF] py-3 px-8 rounded-xl shadow-lg font-bold
                           transition-all duration-300 hover:scale-105 hover:shadow-xl
                           flex items-center justify-center gap-2 group relative overflow-hidden"
                  type="submit"
                >
                  <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                  <span>Crear Producto</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                                opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full 
                                transition-all duration-700"></div>
                </button>
              </form>
            </div>

            {/* Eliminar Producto */}
            <div className="bg-[#FFFFFF] rounded-2xl shadow-xl border-2 border-[#BDBDBD]/30 p-8
                          hover:shadow-2xl hover:shadow-[#424242]/10 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-[#BDBDBD]/30">
                <div className="p-2 bg-gradient-to-br from-red-600 to-red-700 rounded-lg">
                  <Minus size={24} className="text-[#FFFFFF]" />
                </div>
                <h2 className="font-bold text-2xl text-[#000000]">Eliminar Producto</h2>
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold text-[#424242]">Categoría</label>
                    <select
                      onChange={(e) => {
                        const catId = e.target.value
                          ? Number(e.target.value)
                          : null;
                        setCategoryForProductDelete(catId);
                        setSelectedProductId(null);
                      }}
                      className="border-2 border-[#BDBDBD]/50 p-3 rounded-xl capitalize
                               focus:outline-none focus:ring-2 focus:ring-[#000000] focus:border-transparent
                               bg-[#FFFFFF] text-[#424242] hover:border-[#757575] transition-all duration-300"
                    >
                      <option value="">Seleccionar categoría</option>
                      {categories?.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.nombre}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-semibold text-[#424242]">Producto</label>
                    <select
                      onChange={(e) => {
                        setSelectedProductId(Number(e.target.value));
                      }}
                      disabled={!categoryForProductDelete}
                      className="border-2 border-[#BDBDBD]/50 p-3 rounded-xl capitalize
                               focus:outline-none focus:ring-2 focus:ring-[#000000] focus:border-transparent
                               bg-[#FFFFFF] text-[#424242] hover:border-[#757575] transition-all duration-300
                               disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="">Seleccionar</option>
                      {products
                        ?.filter(
                          (prod) => prod.categoriaId === categoryForProductDelete
                        )
                        .map((prod) => (
                          <option key={prod.id} value={prod.id}>
                            {prod.nombre}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                {selectedProduct && (
                  <div className="flex items-center justify-between gap-4 border-2 border-[#BDBDBD]/30 
                                rounded-xl p-4 bg-gradient-to-r from-[#BDBDBD]/5 to-transparent
                                animate-scale-in">
                    <div className="flex gap-6">
                      <div className="flex flex-col">
                        <span className="font-bold text-[#757575] text-xs uppercase">Categoría</span>
                        <span className="capitalize text-[#000000] font-semibold">
                          {selectedProduct.categoria}
                        </span>
                      </div>
                      <div className="w-px bg-[#BDBDBD]/30"></div>
                      <div className="flex flex-col">
                        <span className="font-bold text-[#757575] text-xs uppercase">Nombre</span>
                        <span className="capitalize text-[#000000] font-semibold">
                          {selectedProduct.nombre}
                        </span>
                      </div>
                    </div>

                    <button
                      className="p-3 text-red-600 hover:text-[#FFFFFF] hover:bg-red-600 rounded-xl
                               transition-all duration-300 hover:scale-110 group"
                      onClick={() => {
                        toast.warning(
                          `¿Estás seguro de que quieres eliminar el producto?`,
                          {
                            duration: 3000,
                            action: {
                              label: "Eliminar",
                              onClick: () =>
                                deleteProductMutate({ id: selectedProduct.id }),
                            },
                          }
                        );
                      }}
                    >
                      <Trash2Icon className="group-hover:scale-110 transition-transform duration-300" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Columna Derecha - Categorías */}
          <div className="space-y-8 animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
            
            {/* Crear Categoría */}
            <div className="bg-[#FFFFFF] rounded-2xl shadow-xl border-2 border-[#BDBDBD]/30 p-8
                          hover:shadow-2xl hover:shadow-[#424242]/10 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-[#BDBDBD]/30">
                <div className="p-2 bg-gradient-to-br from-[#000000] to-[#424242] rounded-lg">
                  <Plus size={24} className="text-[#FFFFFF]" />
                </div>
                <h2 className="font-bold text-2xl text-[#000000]">Crear Categoría</h2>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  categoryForm.handleSubmit();
                }}
                className="flex flex-col gap-6"
              >
                <CategoryField
                  name="nombre"
                  validators={{
                    onSubmit: ({ value }) => {
                      if (!value) return "Este campo es obligatorio";
                    },
                  }}
                >
                  {(field) => (
                    <div className="flex flex-col gap-2">
                      <label className="font-semibold text-[#424242] flex items-center gap-2">
                        <Tag size={18} />
                        Nombre de la Categoría
                      </label>
                      <input
                        type="text"
                        value={field.state.value ?? ""}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Ej: Pizzas"
                        className="border-2 border-[#BDBDBD]/50 p-3 rounded-xl
                                 focus:outline-none focus:ring-2 focus:ring-[#000000] focus:border-transparent
                                 bg-[#FFFFFF] text-[#424242] placeholder:text-[#BDBDBD]
                                 hover:border-[#757575] transition-all duration-300"
                      />
                      {field.state.meta.errors.length > 0 && (
                        <em className="text-red-600 text-sm flex items-center gap-1">
                          ⚠️ {field.state.meta.errors.join(", ")}
                        </em>
                      )}
                    </div>
                  )}
                </CategoryField>

                <button
                  className="bg-gradient-to-r from-[#000000] to-[#424242] hover:from-[#424242] hover:to-[#000000]
                           text-[#FFFFFF] py-3 px-8 rounded-xl shadow-lg font-bold
                           transition-all duration-300 hover:scale-105 hover:shadow-xl
                           flex items-center justify-center gap-2 group relative overflow-hidden"
                  type="submit"
                >
                  <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                  <span>Crear Categoría</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                                opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full 
                                transition-all duration-700"></div>
                </button>
              </form>
            </div>

            {/* Eliminar Categoría */}
            <div className="bg-[#FFFFFF] rounded-2xl shadow-xl border-2 border-[#BDBDBD]/30 p-8
                          hover:shadow-2xl hover:shadow-[#424242]/10 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-[#BDBDBD]/30">
                <div className="p-2 bg-gradient-to-br from-red-600 to-red-700 rounded-lg">
                  <Minus size={24} className="text-[#FFFFFF]" />
                </div>
                <h2 className="font-bold text-2xl text-[#000000]">Eliminar Categoría</h2>
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-[#424242]">Categoría</label>
                  <select
                    onChange={(e) => {
                      const catId = e.target.value ? Number(e.target.value) : null;
                      setCategoryForCategoryDelete(catId);
                      setSelectedProductId(null);
                    }}
                    className="border-2 border-[#BDBDBD]/50 p-3 rounded-xl capitalize
                             focus:outline-none focus:ring-2 focus:ring-[#000000] focus:border-transparent
                             bg-[#FFFFFF] text-[#424242] hover:border-[#757575] transition-all duration-300"
                  >
                    <option value="">Seleccionar categoría</option>
                    {categories?.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                {categoryForCategoryDelete &&
                  (() => {
                    const selectedCat = categories?.find(
                      (c) => c.id === categoryForCategoryDelete
                    );
                    return selectedCat ? (
                      <div className="flex items-center justify-between gap-4 border-2 border-[#BDBDBD]/30 
                                    rounded-xl p-4 bg-gradient-to-r from-[#BDBDBD]/5 to-transparent
                                    animate-scale-in">
                        <div className="flex flex-col">
                          <span className="font-bold text-[#757575] text-xs uppercase">Nombre</span>
                          <span className="capitalize text-[#000000] font-semibold text-lg">
                            {selectedCat.nombre}
                          </span>
                        </div>
                        <button
                          className="p-3 text-red-600 hover:text-[#FFFFFF] hover:bg-red-600 rounded-xl
                                   transition-all duration-300 hover:scale-110 group"
                          onClick={() => {
                            toast.warning(
                              `¿Estás seguro de que quieres eliminar la categoría ${selectedCat.nombre}?`,
                              {
                                duration: 3000,
                                action: {
                                  label: "Eliminar",
                                  onClick: () =>
                                    deleteCategoryMutate({ id: selectedCat.id }),
                                },
                              }
                            );
                          }}
                        >
                          <Trash2Icon className="group-hover:scale-110 transition-transform duration-300" />
                        </button>
                      </div>
                    ) : null;
                  })()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
