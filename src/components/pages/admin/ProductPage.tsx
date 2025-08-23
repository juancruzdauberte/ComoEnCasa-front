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
import { Trash2Icon } from "lucide-react";

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
    <section className="flex flex-col  gap-10 w-full">
      <h1 className="text-center text-3xl font-semibold mt-5">
        Productos y Categorías
      </h1>
      <div className="flex w-full justify-between">
        <div className="w-1/2 px-36 flex flex-col gap-16">
          <div className="">
            <h2 className="font-semibold text-2xl mb-5">Crear producto</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                productForm.handleSubmit();
              }}
              className="flex flex-col gap-5"
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
                  <div className="flex flex-col w-full sm:w-1/3">
                    <label className="mb-1">Categoría</label>
                    <div className="flex flex-col">
                      <select
                        id="categoria"
                        className="border p-2 rounded capitalize"
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
                        <em className="text-red-600 text-sm">
                          {field.state.meta.errors.join(", ")}
                        </em>
                      )}
                    </div>
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
                    <label>Nombre producto:</label>
                    <div className="flex flex-col">
                      <input
                        type="text"
                        value={field.state.value ?? ""}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="w-3/4 border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {field.state.meta.errors.length > 0 && (
                        <em className="text-red-600 text-sm">
                          {field.state.meta.errors.join(", ")}
                        </em>
                      )}
                    </div>
                  </div>
                )}
              </ProductField>

              <button
                className="bg-blue-600 hover:bg-blue-700 transition text-white py-2 px-6 rounded shadow w-2/5"
                type="submit"
              >
                Crear producto
              </button>
            </form>
          </div>

          <div>
            <h4 className="font-semibold text-2xl mb-5">Eliminar producto</h4>
            <div className="flex items-center gap-12">
              <div className="flex flex-col gap-3">
                <div>
                  <h5>Categoría</h5>
                  <select
                    onChange={(e) => {
                      const catId = e.target.value
                        ? Number(e.target.value)
                        : null;
                      setCategoryForProductDelete(catId);
                      setSelectedProductId(null);
                    }}
                    className="border p-2 rounded capitalize"
                  >
                    <option value="">Seleccionar categoría</option>
                    {categories?.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <h4>Producto</h4>
                  <select
                    onChange={(e) => {
                      setSelectedProductId(Number(e.target.value));
                    }}
                    disabled={!categoryForProductDelete}
                    className="border p-2 rounded capitalize"
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
                <div className="flex items-center gap-6 border shadow-lg p-2">
                  <div className="flex flex-col">
                    <span className="font-semibold">Categoría:</span>
                    <span className="capitalize">
                      {selectedProduct.categoria}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold">Nombre:</span>
                    <span className="capitalize">{selectedProduct.nombre}</span>
                  </div>

                  <button
                    className="text-red-500 hover:text-red-300"
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
                    <Trash2Icon />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-1/2 px-36 flex flex-col gap-14">
          <div>
            <h2 className="font-semibold text-2xl mb-5">Crear categoría</h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                categoryForm.handleSubmit();
              }}
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
                    <label>Nombre categoría:</label>
                    <div className="flex flex-col">
                      <input
                        type="text"
                        value={field.state.value ?? ""}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="w-3/4 border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {field.state.meta.errors.length > 0 && (
                        <em className="text-red-600 text-sm">
                          {field.state.meta.errors.join(", ")}
                        </em>
                      )}
                    </div>
                  </div>
                )}
              </CategoryField>

              <button
                className="bg-blue-600 hover:bg-blue-700 transition text-white py-2 px-6 rounded shadow mt-5"
                type="submit"
              >
                Crear categoria
              </button>
            </form>
          </div>

          <div className="flex flex-col gap-5">
            <h4 className="font-semibold text-2xl">Eliminar categoría</h4>
            <div className="flex flex-col">
              <h5>Categoría</h5>
              <select
                onChange={(e) => {
                  const catId = e.target.value ? Number(e.target.value) : null;
                  setCategoryForCategoryDelete(catId);
                  setSelectedProductId(null);
                }}
                className="border p-2 rounded capitalize w-1/3"
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
                  <div className="flex items-center justify-between gap-5 border p-2 shadow-lg w-1/3 px-3">
                    <div className="flex flex-col">
                      <span className="font-semibold">Nombre:</span>
                      <span className="capitalize">{selectedCat.nombre}</span>
                    </div>
                    <button
                      className="text-red-500 hover:text-red-300"
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
                      <Trash2Icon />
                    </button>
                  </div>
                ) : null;
              })()}
          </div>
        </div>
      </div>
    </section>
  );
};
