import type { Order } from "../types/types";
import { toLocalDateStringUTC3 } from "../utils/utilsFunction";
import { FinanceCard } from "../layouts/FinanceCard";

type Props = {
  cashAmountToday: number | undefined;
  transferAmountToday: number | undefined;
  amountToday: number | undefined;
  orders: Order[];
};
export const FinanceOrderToday = ({
  cashAmountToday,
  transferAmountToday,
  amountToday,
  orders,
}: Props) => {
  const filteredOrders = orders.filter(
    (o) =>
      toLocalDateStringUTC3(o.fecha_pedido) ===
      toLocalDateStringUTC3(new Date().toISOString())
  );
  return (
    <div className="flex gap-10">
      <div className="flex flex-col gap-5">
        <FinanceCard
          title="HOY"
          subtitle={`Día de hoy: ${toLocalDateStringUTC3(
            new Date().toISOString()
          )}`}
          data={[
            { label: "Efectivo 💵", value: cashAmountToday },
            { label: "Transferencia 📲", value: transferAmountToday },
            { label: "Monto total 💲", value: amountToday },
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
