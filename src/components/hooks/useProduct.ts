import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getProductsByCategory,
  getCategorys,
  getProductById,
  getAllProducts,
  createProduct,
  createCategory,
  deleteProduct,
  deleteCategory,
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
  const queryClient = useQueryClient();

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
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return { createProductMutation };
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  const { mutate: createCategoryMutation } = useMutation({
    mutationFn: ({ nombre }: { nombre: string }) => createCategory(nombre),
    onSuccess: () => {
      toast.success("Categoria creada correctamente");
      queryClient.invalidateQueries({ queryKey: ["categorys"] });
    },
  });

  return { createCategoryMutation };
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteProductMutate } = useMutation({
    mutationFn: ({ id }: { id: number }) => deleteProduct(id),
    onSuccess: () => {
      toast.success("Producto eliminado correctamente");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return { deleteProductMutate };
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteCategoryMutate } = useMutation({
    mutationFn: ({ id }: { id: number }) => deleteCategory(id),
    onSuccess: () => {
      toast.success("Categoria eliminada correctamente");
      queryClient.invalidateQueries({ queryKey: ["categorys"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return { deleteCategoryMutate };
};
