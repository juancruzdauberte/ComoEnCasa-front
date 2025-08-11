import {
  useAmountToday,
  useCashAmountToday,
  useTransferAmountToday,
} from "../../hooks/useFinance";

export const Finances = () => {
  const { data: amountToday } = useAmountToday();
  const { data: cashAmountToday } = useCashAmountToday();
  const { data: transferAmountToday } = useTransferAmountToday();
  return (
    <section>
      <div className="flex flex-col border-2 border-black w-1/4 p-2">
        <h2 className="text-center text-3xl font-bold">HOY</h2>
        <em className="text-gray-400 text-center">
          Recorda que para que se registre dicho monto se debe completar el pago
          del pedido
        </em>
        <p className="mt-4 text-lg">
          Dia de hoy:{" "}
          <span className="font-semibold text-xl">
            {new Date().toLocaleDateString()}
          </span>
        </p>
        <div className="flex flex-col gap-1 mt-2 ">
          <p className="text-lg">
            Monto total:{" "}
            <span className="font-semibold text-xl">${amountToday}</span>
          </p>
          <p>
            Efectivo:{" "}
            <span className="font-semibold text-lg">${cashAmountToday}</span>
          </p>
          <p>
            Transferencia:{" "}
            <span className="font-semibold text-lg">
              ${transferAmountToday}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};
