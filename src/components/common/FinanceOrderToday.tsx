import type { Order } from "../types/types";
import { toLocalDateStringUTC3 } from "../utils/utilsFunction";
import { FinanceCard } from "./FinanceCard";
import { OrderCard } from "./OrderCard";

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
        <p>
          Pedidos totales:{" "}
          <span className="font-semibold">{orders.length}</span>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {orders.map((o) => (
          <div key={o.id}>
            <OrderCard id={o.id} />
          </div>
        ))}
      </div>
    </div>
  );
};
