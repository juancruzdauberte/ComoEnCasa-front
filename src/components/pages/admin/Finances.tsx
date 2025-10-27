import { useEffect, useState } from "react";
import {
  useAmountMonthly,
  useAmountToday,
  useCashAmountMonthly,
  useCashAmountToday,
  useDeliveryAmountToPay,
  useValueFinanceParam,
  useTransferAmountMonthly,
  useTransferAmountToday,
  useUpdateValueParam,
  useCashAmountDelivery,
} from "../../hooks/useFinance";
import { AccordionLayout } from "@/components/layouts/Accordion";
import { useOrders } from "@/components/hooks/useOrder";
import { orderStore } from "@/components/store/orderStore";
import { FinanceDeliveryToday } from "@/components/common/FinanceDeliveryToday";
import { FinanceOrderToday } from "@/components/common/FinanceOrderToday";
import { FinanceDeliveryConfig } from "@/components/common/FinanceDeliveryConfig";
import { FinanceMonthly } from "@/components/common/FinanceMonthly";
import { DollarSign, TrendingUp, AlertCircle } from "lucide-react";

export const Finances = () => {
  const { data: amountToday } = useAmountToday();
  const { data: cashAmountToday } = useCashAmountToday();
  const { data: transferAmountToday } = useTransferAmountToday();
  const { data: cashDeliveryAmount } = useCashAmountDelivery();
  const actuallyYear = new Date().getFullYear();
  const actuallyMonth = new Date().getMonth() + 1;
  const [year, setYear] = useState<number>(actuallyYear);
  const [month, setMonth] = useState<number>(actuallyMonth);
  const [valueAccordion, setValueAccordion] = useState<string | null>(
    "pedidos-hoy"
  );
  const { setLimit } = orderStore();
  const { data: amountMonthly } = useAmountMonthly(month, year);
  const { data: transferAmountMonthly } = useTransferAmountMonthly(month, year);
  const { data: cashAmountMonthly } = useCashAmountMonthly(month, year);
  const { data: orders } = useOrders();
  const { data: amountToPay } = useDeliveryAmountToPay();
  const { data: priceDeliveryBiker } = useValueFinanceParam("monto_por_pedido");
  const { updateValueParam } = useUpdateValueParam();

  useEffect(() => {
    setLimit(100);
  }, [setLimit]);

  const sectionsData = [
    {
      value: "pedidos",
      title: "Pedidos",
      buttons: [
        { value: "pedidos-hoy", label: "Total de hoy" },
        { value: "pedidos-mes", label: "Total del mes" },
      ],
    },
    {
      value: "delivery",
      title: "Delivery",
      buttons: [
        { value: "delivery-hoy", label: "Total de hoy" },
        { value: "delivery-config", label: "Configuración" },
      ],
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#FFFFFF] via-[#BDBDBD]/10 to-[#FFFFFF]">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#000000] via-[#424242] to-[#000000] pt-16 pb-24">
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

        <div className="absolute top-10 right-10 w-32 h-32 bg-[#BDBDBD]/10 rounded-full blur-3xl animate-pulse"></div>

        <div className="relative container mx-auto px-6">
          <div className="text-center space-y-6 animate-fade-in">
            {/* Icon */}
            <div
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl 
                          bg-gradient-to-br from-[#FFFFFF]/20 to-[#BDBDBD]/10 backdrop-blur-sm
                          border-2 border-[#BDBDBD]/30 mb-4"
            >
              <DollarSign size={40} className="text-[#FFFFFF]" />
            </div>

            {/* Title */}
            <h1 className="font-bold text-5xl md:text-6xl text-[#FFFFFF] drop-shadow-2xl">
              Gestión Financiera
            </h1>

            {/* Subtitle */}
            <div className="max-w-3xl mx-auto space-y-3">
              <div className="h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-[#BDBDBD] to-transparent"></div>
              <p className="text-[#BDBDBD] text-lg flex items-center justify-center gap-2">
                <AlertCircle size={20} />
                <span>
                  Recordá que para que se registre el monto se debe completar el
                  pago del pedido
                </span>
              </p>
            </div>

            {/* Stats Cards */}
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto pt-6"
              style={{ animation: "fadeInRow 0.6s ease-out 0.4s both" }}
            >
              {[
                {
                  label: "Ingresos Hoy",
                  icon: "💰",
                  filter: "pedidos-hoy",
                },
                {
                  label: "Ingresos Mensuales",
                  icon: "📊",
                  filter: "pedidos-mes",
                },
                { label: "Delivery", icon: "🏍️", filter: "delivery-hoy" },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  onClick={() => {
                    setValueAccordion(stat.filter);
                    document.getElementById("finanzas")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                  className="bg-[#FFFFFF]/5 backdrop-blur-sm border border-[#BDBDBD]/20 rounded-xl p-4
                           hover:bg-[#FFFFFF]/10 transition-all duration-300 group cursor-pointer"
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                >
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <p className="text-[#BDBDBD] text-sm font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full h-16"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 C300,80 900,80 1200,0 L1200,120 L0,120 Z"
              className="fill-[#FFFFFF]"
            ></path>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 mt-1 pb-12">
        <div className="flex gap-6">
          {/* Sidebar Navigation */}
          <div className="w-1/5 animate-slide-in-left">
            <div
              className="bg-[#FFFFFF] rounded-2xl shadow-xl border-2 border-[#BDBDBD]/30 p-4
                          hover:shadow-2xl hover:shadow-[#424242]/10 transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-[#BDBDBD]/30">
                <TrendingUp size={20} className="text-[#424242]" />
                <h3 className="font-bold text-[#000000]">Categorías</h3>
              </div>
              <AccordionLayout
                selected={valueAccordion}
                setSelected={setValueAccordion}
                sections={sectionsData}
              />
            </div>
          </div>

          {/* Content Area */}
          <div
            className="flex-1 animate-slide-in-right"
            style={{ animationDelay: "0.2s" }}
          >
            <div
              className="bg-[#FFFFFF] rounded-2xl shadow-xl border-2 border-[#BDBDBD]/30 p-8
                          hover:shadow-2xl hover:shadow-[#424242]/10 transition-all duration-300 min-h-[400px] flex justify-center"
              id="finanzas"
            >
              {valueAccordion === "pedidos-hoy" && (
                <div className="animate-fade-in">
                  <FinanceOrderToday
                    cashAmountToday={cashAmountToday}
                    transferAmountToday={transferAmountToday}
                    amountToday={amountToday}
                    orders={orders?.data || []}
                  />
                </div>
              )}

              {valueAccordion === "delivery-hoy" && (
                <div className="animate-fade-in">
                  <FinanceDeliveryToday
                    cashDeliveryAmount={cashDeliveryAmount}
                    amountToPay={amountToPay}
                    orders={orders?.data || []}
                  />
                </div>
              )}

              {valueAccordion === "delivery-config" && (
                <div className="animate-fade-in">
                  <FinanceDeliveryConfig
                    priceDeliveryBiker={priceDeliveryBiker?.valor}
                    updateValueParam={updateValueParam}
                  />
                </div>
              )}

              {valueAccordion === "pedidos-mes" && (
                <div className="animate-fade-in">
                  <FinanceMonthly
                    actuallyMonth={actuallyMonth}
                    actuallyYear={actuallyYear}
                    amountMonthly={amountMonthly}
                    setMonth={setMonth}
                    setYear={setYear}
                    cashAmountMonthly={cashAmountMonthly}
                    transferAmountMonthly={transferAmountMonthly}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

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
