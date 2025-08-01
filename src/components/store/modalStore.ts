import { create } from "zustand";

interface ModalStore {
  isOpen: boolean;
  isEditOpen: boolean;
  isCreateOpen: boolean;
  setIsCreateOpen: (isCreateOpen: boolean) => void;
  setIsOpen: (isOpen: boolean) => void;
  setIsEditOpen: (isEditOpen: boolean) => void;
}

export const modalStore = create<ModalStore>((set) => ({
  isOpen: false,
  isEditOpen: false,
  isCreateOpen: false,
  setIsCreateOpen: (isCreateOpen) => set({ isCreateOpen }),
  setIsEditOpen: (isEditOpen) => set({ isEditOpen }),
  setIsOpen: (isOpen) => set({ isOpen }),
}));
