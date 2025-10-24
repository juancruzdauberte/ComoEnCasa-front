import { FinanceCard } from "../layouts/FinanceCard";

type Props = {
  actuallyMonth: number;
  actuallyYear: number;
  setMonth: React.Dispatch<React.SetStateAction<number>>;
  setYear: React.Dispatch<React.SetStateAction<number>>;
  cashAmountMonthly: number | undefined;
  transferAmountMonthly: number | undefined;
  amountMonthly: number | undefined;
};
export const FinanceMonthly = ({
  actuallyMonth,
  actuallyYear,
  amountMonthly,
  setMonth,
  setYear,
  cashAmountMonthly,
  transferAmountMonthly,
}: Props) => {
  return (
    <FinanceCard
      title="MES"
      headerExtra={
        <div className="flex gap-4">
          <div className="flex flex-col">
            <label className="font-semibold">Mes:</label>{" "}
            <select
              className="border-2 border-black"
              onChange={(e) => setMonth(Number(e.target.value))}
            >
              <option value={actuallyMonth}>Seleccionar mes</option>{" "}
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
        { label: "Efectivo 💵", value: cashAmountMonthly },
        { label: "Transferencia 📲", value: transferAmountMonthly },
        { label: "Monto total 💲", value: amountMonthly },
      ]}
    />
  );
};
