import type { ReactNode } from "react";
import { modalStore } from "../store/modalStore";
import { orderStore } from "../store/orderStore";

export const Modal = ({ children }: { children: ReactNode }) => {
  const { setIsOpen } = modalStore();
  const { setOrderSelected } = orderStore();
  const handleBackgroundClick = () => {
    setOrderSelected(null);
    setIsOpen(false);
  };
  return (
    <section
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleBackgroundClick}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </section>
  );
};
