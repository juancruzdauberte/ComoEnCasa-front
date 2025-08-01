import { api } from "../config/axios";
import type { CategorysResponse, GetProductosResponse } from "../types/types";

export async function getCategorys() {
  try {
    const { data } = await api.get<CategorysResponse>("/products/categorys");
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getProductsByCategory(categoryId: number) {
  try {
    const { data } = await api.get<GetProductosResponse>(
      `/products?category=${categoryId}`
    );
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getAllProducts() {
  try {
    const { data } = await api.get<GetProductosResponse>("/products");
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getProductById(id: number) {
  try {
    const { data } = await api.get(`/products/${id}`);
    return data;
  } catch (error) {
    console.error(error);
  }
}
