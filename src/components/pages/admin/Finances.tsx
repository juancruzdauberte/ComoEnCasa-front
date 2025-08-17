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
    <section className="flex flex-col items-center justify-center gap-16">
      <div className="flex flex-col gap-2 mt-10">
        <h1 className="font-bold text-4xl text-center">Finanzas</h1>
        <em className="text-gray-400 text-center">
          Recordá que para que se registre dicho monto se debe completar el pago
          del pedido.
        </em>
      </div>

      <div className="flex w-full px-7">
        <div className="w-1/6">
          <AccordionLayout
            selected={valueAccordion}
            setSelected={setValueAccordion}
            sections={sectionsData}
          />
        </div>
        <div className="flex justify-center w-full">
          {valueAccordion === "pedidos-hoy" && (
            <FinanceOrderToday
              cashAmountToday={cashAmountToday}
              transferAmountToday={transferAmountToday}
              amountToday={amountToday}
              orders={orders?.data || []}
            />
          )}

          {valueAccordion === "delivery-hoy" && (
            <FinanceDeliveryToday
              cashDeliveryAmount={cashDeliveryAmount}
              amountToPay={amountToPay}
              orders={orders?.data || []}
            />
          )}

          {valueAccordion === "delivery-config" && (
            <FinanceDeliveryConfig
              priceDeliveryBiker={priceDeliveryBiker?.valor}
              updateValueParam={updateValueParam}
            />
          )}

          {valueAccordion === "pedidos-mes" && (
            <FinanceMonthly
              actuallyMonth={actuallyMonth}
              actuallyYear={actuallyYear}
              amountMonthly={amountMonthly}
              setMonth={setMonth}
              setYear={setYear}
              cashAmountMonthly={cashAmountMonthly}
              transferAmountMonthly={transferAmountMonthly}
            />
          )}
        </div>
      </div>
    </section>
  );
};
