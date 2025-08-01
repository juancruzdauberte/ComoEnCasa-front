import { create } from "zustand";

interface OrderStore {
  orderSelected: number | null;
  setOrderSelected: (orderSelected: number | null) => void;
  filter: string | null;
  page: number;
  setFilter: (filter: string | null) => void;
  setPage: (page: number | ((prev: number) => number)) => void;
}

export const orderStore = create<OrderStore>((set) => ({
  orderSelected: null,
  filter: "desc",
  page: 1,
  setFilter: (filter) => set({ filter }),
  setPage: (page) =>
    set((state) => ({
      page: typeof page === "function" ? page(state.page) : page,
    })),
  setOrderSelected: (orderSelected) => set({ orderSelected }),
}));
