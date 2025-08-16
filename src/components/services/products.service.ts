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

export async function createCategory(nombre: string) {
  try {
    const { data } = await api.post(`/products/category`, { nombre });
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function createProduct(nombre: string, categoria_id: number) {
  try {
    const { data } = await api.post(`/products`, {
      nombre,
      categoria_id,
    });
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function deleteProduct(id: number) {
  try {
    const { data } = await api.delete(`/products/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteCategory(id: number) {
  try {
    const { data } = await api.delete(`/products/category/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
}
