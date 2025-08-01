import { useQuery } from "@tanstack/react-query";
import {
  getProductsByCategory,
  getCategorys,
  getProductById,
  getAllProducts,
} from "../services/products.service";

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
