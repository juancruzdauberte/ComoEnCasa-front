import { OrderLayout } from "../../layouts/OrderLayout";
import { Modal } from "../../layouts/Modal";
import { OrderModal } from "../../common/OrderModal";
import { modalStore } from "../../store/modalStore";
import { BtnCreateOrder } from "@/components/common/widget/BtnCreateOrder";

export const AdminHome = () => {
  const { isOpen } = modalStore();

  return (
    <section className="mt-20 bg-gradient-to-br from-[#FFFFFF] via-[#BDBDBD]/10 to-[#FFFFFF]">
      {/* Content */}
      <section className="container mx-auto px-6 -mt-20 pb-12">
        <div
          className="bg-[#FFFFFF] rounded-3xl shadow-2xl p-8 border-2 border-[#BDBDBD]/20 
                     backdrop-blur-xl transform transition-all duration-500 hover:shadow-[#424242]/20
                     animate-scale-in"
          style={{ animationDelay: "0.8s" }}
        >
          {/* Encabezado de la sección */}
          <div className="mb-6 pb-4 border-b-2 border-[#BDBDBD]/30 flex justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#000000] flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-[#000000] to-[#424242] rounded-full"></div>
                Gestión de Pedidos
              </h2>
              <p className="text-[#757575] mt-2 ml-7">
                Visualiza y administra todos los pedidos del sistema
              </p>
            </div>

            <BtnCreateOrder
              btnClassname="group relative inline-flex items-center gap-2 px-3 py-2 bg-[#000000] text-[#FFFFFF] 
                           font-bold rounded-2xl 
                           transition-all duration-500 hover:scale-105 hover:-translate-y-1
                           overflow-hidden border-2 border-transparent hover:border-[#BDBDBD]"
            />
          </div>

          <div id="pedidos">
            <OrderLayout />
          </div>
        </div>
      </section>

      {isOpen && (
        <Modal>
          <OrderModal />
        </Modal>
      )}

      <style>{`
        @keyframes fadeInRow {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};
