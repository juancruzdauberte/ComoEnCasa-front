import { create } from "zustand";

interface ModalStore {
  isOpen: boolean;
  isCreateOpen: boolean;
  setIsCreateOpen: (isCreateOpen: boolean) => void;
  setIsOpen: (isOpen: boolean) => void;
}

export const modalStore = create<ModalStore>((set) => ({
  isOpen: false,
  isCreateOpen: false,
  setIsCreateOpen: (isCreateOpen) => set({ isCreateOpen }),
  setIsOpen: (isOpen) => set({ isOpen }),
}));
