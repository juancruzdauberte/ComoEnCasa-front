import { OrderLayout } from "../../layouts/OrderLayout";
import { Modal } from "../../layouts/Modal";
import { OrderModal } from "../../common/OrderModal";
import { modalStore } from "../../store/modalStore";
// import { Link } from "react-router-dom";
// import { orderStore } from "@/components/store/orderStore";
import { BtnCreateOrder } from "@/components/common/widget/BtnCreateOrder";

export const AdminHome = () => {
  const { isOpen } = modalStore();
  // const { setFilter } = orderStore();

  // const handlePedidosClick = (filter: string) => {
  //   // Seteamos el filtro en el store global
  //   setFilter(filter);

  //   // Hacemos scroll suave a la sección
  //   document.getElementById("pedidos")?.scrollIntoView({
  //     behavior: "smooth",
  //     block: "start",
  //   });
  // };

  return (
    <section className="mt-20 bg-gradient-to-br from-[#FFFFFF] via-[#BDBDBD]/10 to-[#FFFFFF]">
      {/* <div className="relative overflow-hidden bg-gradient-to-br from-[#000000] via-[#424242] to-[#000000] pt-20 pb-32">
        <div className="absolute inset-0 bg-[#000000]/20"></div>


        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle, #FFFFFF 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          ></div>
        </div>


        <div className="absolute top-20 left-20 w-32 h-32 bg-[#BDBDBD]/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-40 h-40 bg-[#757575]/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="relative container mx-auto px-6">
          <div className="text-center space-y-8 animate-fade-in">

            <div className="space-y-4">
              <h1
                className="text-6xl md:text-7xl font-bold text-[#FFFFFF] drop-shadow-2xl 
                           bg-clip-text text-transparent bg-gradient-to-r from-[#FFFFFF] via-[#BDBDBD] to-[#FFFFFF]
                           animate-slide-in-left"
              >
                Panel Administrativo
              </h1>
              <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-[#BDBDBD] to-transparent"></div>
            </div>

            <p
              className="text-xl text-[#BDBDBD] max-w-2xl mx-auto leading-relaxed animate-slide-in-right"
              style={{ animationDelay: "0.2s" }}
            >
              Gestiona pedidos, productos y finanzas desde un solo lugar con
              elegancia y eficiencia
            </p>

            <BtnCreateOrder
              btnClassname="group relative inline-flex items-center gap-3 px-10 py-5 bg-[#FFFFFF] text-[#000000] 
                           font-bold rounded-2xl shadow-2xl hover:shadow-[#BDBDBD]/50 
                           transition-all duration-500 hover:scale-105 hover:-translate-y-2
                           overflow-hidden border-2 border-transparent hover:border-[#BDBDBD]"
            />

            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto pt-8"
              style={{ animation: "fadeInRow 0.6s ease-out 0.6s both" }}
            >
              {[
                {
                  label: "Pedidos Activos",
                  icon: "📦",
                  to: "pedidos",
                  filter: "todos",
                },
                {
                  label: "En Proceso",
                  icon: "⚡",
                  to: "pedidos",
                  filter: "preparando",
                },
                {
                  label: "Productos",
                  icon: "🏷️",
                  to: "product",
                  filter: "hoy",
                },
              ].map((stat, index) => {
                // Definimos el contenido de la tarjeta
                const cardContent = (
                  <div
                    className="bg-[#FFFFFF]/5 backdrop-blur-sm border border-[#BDBDBD]/20 rounded-xl p-4
                               hover:bg-[#FFFFFF]/10 transition-all duration-300 group cursor-pointer"
                    style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                  >
                    <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                      {stat.icon}
                    </div>
                    <p className="text-[#BDBDBD] text-sm font-medium">
                      {stat.label}
                    </p>
                  </div>
                );

                if (stat.to === "product") {
                  return (
                    <Link key={stat.label} to={stat.to}>
                      {cardContent}
                    </Link>
                  );
                } else {
                  return (
                    <div
                      key={stat.label}
                      onClick={() => handlePedidosClick(stat.filter)}
                    >
                      {cardContent}
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>

   
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full h-20"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 C300,80 900,80 1200,0 L1200,120 L0,120 Z"
              className="fill-[#FFFFFF]"
            ></path>
          </svg>
        </div>
      </div> */}

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
