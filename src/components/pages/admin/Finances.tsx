import { useState } from "react";
import {
  useAmountMonthly,
  useAmountToday,
  useCashAmountMonthly,
  useCashAmountToday,
  useTransferAmountMonthly,
  useTransferAmountToday,
} from "../../hooks/useFinance";
import { FinanceCard } from "../../common/FinanceCard";

export const Finances = () => {
  const { data: amountToday } = useAmountToday();
  const { data: cashAmountToday } = useCashAmountToday();
  const { data: transferAmountToday } = useTransferAmountToday();
  const actuallyYear = new Date().getFullYear();
  const actuallyMonth = new Date().getMonth() + 1;

  const [year, setYear] = useState<number>(actuallyYear);
  const [month, setMonth] = useState<number>(actuallyMonth);
  const { data: amountMonthly } = useAmountMonthly(month, year);
  const { data: transferAmountMonthly } = useTransferAmountMonthly(month, year);
  const { data: cashAmountMonthly } = useCashAmountMonthly(month, year);

  return (
    <section className="flex flex-col items-center justify-center gap-10">
      <div className="flex flex-col gap-2 mt-10">
        <h1 className="font-bold text-4xl text-center">Finanzas</h1>
        <em className="text-gray-400 text-center">
          Recordá que para que se registre dicho monto se debe completar el pago
          del pedido.
        </em>
      </div>

      <div className="flex gap-10 mt-20">
        <FinanceCard
          title="HOY"
          subtitle={`Día de hoy: ${new Date().toLocaleDateString()}`}
          data={[
            { label: "Monto total", value: amountToday },
            { label: "Efectivo", value: cashAmountToday },
            { label: "Transferencia", value: transferAmountToday },
          ]}
        />

        <FinanceCard
          title="MES"
          headerExtra={
            <div className="flex gap-4">
              <div className="flex flex-col">
                <label className="font-semibold">Mes:</label>
                <select
                  className="border-2 border-black"
                  onChange={(e) => setMonth(Number(e.target.value))}
                >
                  <option value={actuallyMonth}>Seleccionar mes</option>
                  {[
                    "Enero",
                    "Febrero",
                    "Marzo",
                    "Abril",
                    "Mayo",
                    "Junio",
                    "Julio",
                    "Agosto",
                    "Septiembre",
                    "Octubre",
                    "Noviembre",
                    "Diciembre",
                  ].map((mes, idx) => (
                    <option key={idx} value={idx + 1}>
                      {mes}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="font-semibold">Año:</label>
                <select
                  className="border-2 border-black"
                  onChange={(e) => setYear(Number(e.target.value))}
                >
                  <option value={actuallyYear}>Seleccionar año</option>
                  {[2025, 2026, 2027].map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          }
          data={[
            { label: "Monto total", value: amountMonthly },
            { label: "Efectivo", value: cashAmountMonthly },
            { label: "Transferencia", value: transferAmountMonthly },
          ]}
        />
      </div>
    </section>
  );
};
