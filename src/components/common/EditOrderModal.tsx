import { CgClose } from "react-icons/cg";
import { modalStore } from "../store/modalStore";
import { useOrder } from "../hooks/useOrder";
import { orderStore } from "../store/orderStore";

export const EditOrderModal = () => {
  const { setIsEditOpen } = modalStore();
  const { orderSelected } = orderStore();
  const { data: order } = useOrder(orderSelected!);
  return (
    <div className="bg-white rounded-2xl shadow-lg w-full max-w-5xl  p-6 relative animate-fadeIn text-black">
      <button
        onClick={() => {
          setIsEditOpen(false);
        }}
        className="absolute top-4 right-5 text-black transition hover:text-slate-600"
      >
        <CgClose size={30} />
      </button>

      <section className="flex flex-col items-center gap-10">
        <h1 className="font-bold text-2xl">ID: {order?.id}</h1>
      </section>
    </div>
  );
};
