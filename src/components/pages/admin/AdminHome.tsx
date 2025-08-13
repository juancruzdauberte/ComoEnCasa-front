import { OrderLayout } from "../../layouts/OrderLayout";
import { Modal } from "../../layouts/Modal";
import { OrderModal } from "../../common/OrderModal";
import { modalStore } from "../../store/modalStore";
import { useNavigate } from "react-router-dom";

export const AdminHome = () => {
  const { isOpen } = modalStore();
  const navigate = useNavigate();
  return (
    <section className="flex flex-col items-center">
      <section>
        <button
          className="border rounded-md px-2 bg-slate-700 text-white text-2xl hover:bg-slate-500"
          onClick={() => navigate("/admin/order")}
        >
          Crear pedido
        </button>
      </section>

      <section className="w-full">
        <OrderLayout />

        {isOpen && (
          <Modal>
            <OrderModal />
          </Modal>
        )}
      </section>
    </section>
  );
};
