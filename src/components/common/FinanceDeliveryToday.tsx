import type { Order } from "../types/types";
import { toLocalDateStringUTC3 } from "../utils/utilsFunction";
import { FinanceCard } from "../layouts/FinanceCard";

type Props = {
  cashDeliveryAmount: number | undefined;
  amountToPay: number | undefined;
  orders: Order[];
};
export const FinanceDeliveryToday = ({
  cashDeliveryAmount,
  amountToPay,
  orders,
}: Props) => {
  const filteredOrders = orders.filter(
    (o) =>
      o.domicilio !== null &&
      toLocalDateStringUTC3(o.fecha_pedido) ===
        toLocalDateStringUTC3(new Date().toISOString())
  );

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex flex-col gap-5">
        <FinanceCard
          title="DELIVERY"
          subtitle={`Día de hoy: ${toLocalDateStringUTC3(
            new Date().toISOString()
          )}`}
          data={[
            { label: "Total efectivo 💵", value: cashDeliveryAmount },
            { label: "A pagar 💲", value: amountToPay },
          ]}
        />
        <p className="ml-2">
          Pedidos totales:{" "}
          <span className="font-semibold">{filteredOrders.length}</span>
        </p>
      </div>
    </div>
  );
};
