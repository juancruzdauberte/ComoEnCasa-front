import type { Order } from "../types/types";
import { toLocalDateStringUTC3 } from "../utils/utilsFunction";
import { FinanceCard } from "./FinanceCard";
import { OrderCard } from "./OrderCard";

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
      o.domicilio !== "busca" &&
      toLocalDateStringUTC3(o.fecha_pedido) ===
        toLocalDateStringUTC3(new Date().toISOString())
  );

  return (
    <div className="flex gap-10">
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
        <p>
          Pedidos totales:{" "}
          <span className="font-semibold">{filteredOrders.length}</span>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {filteredOrders.map((o) => (
          <div key={o.id}>
            <OrderCard id={o.id} />
          </div>
        ))}
      </div>
    </div>
  );
};
