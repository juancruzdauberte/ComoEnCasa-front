import { OrderList } from "../../common/OrderList";
import { Modal } from "../../layouts/Modal";
import { OrderModal } from "../../common/OrderModal";
import { modalStore } from "../../store/modalStore";
import { CreateOrderModal } from "../../common/CreateOrderModal";
import { EditOrderModal } from "../../common/EditOrderModal";

export const AdminHome = () => {
  const { isOpen, isEditOpen, isCreateOpen, setIsCreateOpen } = modalStore();
  return (
    <section className="flex flex-col items-center">
      <section>
        <h1 className="font-bold text-2xl">Pedidos</h1>
        <button
          className="border rounded-md px-2 bg-slate-700 text-white"
          onClick={() => setIsCreateOpen(true)}
        >
          Crear pedido
        </button>
      </section>

      <section className="w-4/5">
        <OrderList />

        {isOpen && (
          <Modal>
            <OrderModal />
          </Modal>
        )}

        {isCreateOpen && (
          <Modal>
            <CreateOrderModal />
          </Modal>
        )}

        {isEditOpen && (
          <Modal>
            <EditOrderModal />
          </Modal>
        )}
      </section>
    </section>
  );
};
