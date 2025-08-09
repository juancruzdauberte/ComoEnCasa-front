import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getProductsByCategory,
  getCategorys,
  getProductById,
  getAllProducts,
  createProduct,
  createCategory,
} from "../services/products.service";
import { toast } from "sonner";

export const useCategorys = () => {
  return useQuery({
    queryKey: ["categorys"],
    queryFn: getCategorys,
  });
};

export const useProductsByCategory = (categoryId: number | null = null) => {
  return useQuery({
    queryKey: categoryId ? ["products", categoryId] : ["products", "all"],
    queryFn: () => {
      if (categoryId) return getProductsByCategory(categoryId!);
      return getAllProducts();
    },
    enabled: true,
  });
};

export const useProduct = (productId?: number) => {
  return useQuery({
    queryKey: ["product"],
    queryFn: () => getProductById(productId!),
    enabled: !!productId,
  });
};

export const useCreateProduct = () => {
  const { mutate: createProductMutation } = useMutation({
    mutationFn: ({
      nombre,
      categoria_id,
    }: {
      nombre: string;
      categoria_id: number;
    }) => createProduct(nombre, categoria_id),
    onSuccess: () => {
      toast.success("Producto creado correctamente");
    },
  });

  return { createProductMutation };
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  const { mutate: createCategoryMutation } = useMutation({
    mutationFn: ({ nombre }: { nombre: string }) => createCategory(nombre),
    onSuccess: () => {
      toast.success("Producto creado correctamente");
      queryClient.invalidateQueries({ queryKey: ["categorys"] });
    },
  });

  return { createCategoryMutation };
};
