import { create } from "zustand";

type ProductStore = {
  selectedProduct: number | null;
  selectedCategory: number | null;
  selectedQuantity: number | null;
  setSelectedProduct: (id: number | null) => void;
  setSelectedCategory: (category: number | null) => void;
  setSelectedQuantity: (quantity: number | null) => void;
};

export const productStore = create<ProductStore>((set) => ({
  selectedCategory: null,
  selectedProduct: null,
  selectedQuantity: null,
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSelectedProduct: (id) => set({ selectedProduct: id }),
  setSelectedQuantity: (quantity) => set({ selectedQuantity: quantity }),
}));
