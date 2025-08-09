import { useForm } from "@tanstack/react-form";
import type {
  CreateCategoryResponse,
  CreateProductResponse,
} from "../../types/types";
import {
  useCategorys,
  useCreateCategory,
  useCreateProduct,
} from "../../hooks/useProduct";

export const ProductPage = () => {
  const { data: categories } = useCategorys();
  const { createCategoryMutation } = useCreateCategory();
  const { createProductMutation } = useCreateProduct();
  const productForm = useForm({
    defaultValues: {
      nombre: "",
      categoria_id: 0,
    } as CreateProductResponse,
    onSubmit: ({ value, formApi }) => {
      console.log({ value });
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
      <h1 className="text-center text-3xl font-semibold mt-10">
        Crear categoria y producto
      </h1>
      <div className="flex w-full justify-between">
        <div className="w-1/2 px-36">
          <h2 className="font-semibold text-2xl mb-5">Crear producto</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              productForm.handleSubmit();
            }}
            className="flex flex-col gap-5"
          >
            <ProductField name="nombre">
              {(field) => (
                <div className="flex flex-col gap-2">
                  <label>Nombre producto:</label>
                  <input
                    type="text"
                    value={field.state.value ?? ""}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
            </ProductField>

            <ProductField name="categoria_id">
              {(field) => (
                <div className="flex flex-col w-full sm:w-1/3">
                  <label className="mb-1">Categoría</label>
                  <select
                    id="categoria"
                    className="border p-2 rounded capitalize"
                    value={field.state.value ?? ""}
                    onChange={(e) => {
                      field.handleChange(Number(e.target.value));
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

        <div className="w-1/2 px-36">
          <h2 className="font-semibold text-2xl mb-5">Crear categoria</h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              categoryForm.handleSubmit();
            }}
          >
            <CategoryField name="nombre">
              {(field) => (
                <div className="flex flex-col gap-2">
                  <label>Nombre categoria:</label>
                  <input
                    type="text"
                    value={field.state.value ?? ""}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
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
      </div>
    </section>
  );
};
