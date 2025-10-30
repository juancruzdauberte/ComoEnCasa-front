import { FinanceCard } from "../layouts/FinanceCard";
import { Calendar, Clock } from "lucide-react";

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
    <>
      <FinanceCard
        title="MES"
        headerExtra={
          <div className="flex gap-3 items-end">
            {/* Selector de Mes */}
            <div className="group flex-1">
              <label className="flex items-center gap-2 font-semibold text-slate-700 text-sm mb-2 group-hover:text-slate-900 transition-colors">
                <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" />
                Mes
              </label>
              <div className="relative">
                <select
                  className="w-full px-4 py-2.5 bg-white border-2 border-slate-300 rounded-xl 
                           focus:border-blue-500 focus:bg-slate-50/30 focus:shadow-lg focus:scale-[1.02]
                           hover:border-slate-400 hover:shadow-md appearance-none
                           transition-all duration-300 outline-none cursor-pointer font-medium text-sm
                           bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23475569%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] 
                           bg-no-repeat bg-[length:1rem] bg-[right_0.5rem_center]
                           pr-10"
                  onChange={(e) => setMonth(Number(e.target.value))}
                  value={actuallyMonth}
                >
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
                <div
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 to-blue-500/0 
                              group-hover:from-blue-500/5 group-hover:to-transparent 
                              transition-all duration-300 pointer-events-none"
                ></div>
              </div>
            </div>

            {/* Selector de Año */}
            <div className="group flex-1">
              <label className="flex items-center gap-2 font-semibold text-slate-700 text-sm mb-2 group-hover:text-slate-900 transition-colors">
                <Clock className="w-4 h-4 group-hover:scale-110 transition-transform" />
                Año
              </label>
              <div className="relative">
                <select
                  className="w-full px-4 py-2.5 bg-white border-2 border-slate-300 rounded-xl 
                           focus:border-blue-500 focus:bg-blue-50/30 focus:shadow-lg focus:scale-[1.02]
                           hover:border-slate-400 hover:shadow-md appearance-none
                           transition-all duration-300 outline-none cursor-pointer font-medium text-sm
                           bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23475569%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] 
                           bg-no-repeat bg-[length:1rem] bg-[right_0.5rem_center]
                           pr-10"
                  onChange={(e) => setYear(Number(e.target.value))}
                  value={actuallyYear}
                >
                  {[2024, 2025, 2026, 2027, 2028].map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
                <div
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 to-blue-500/0 
                              group-hover:from-blue-500/5 group-hover:to-transparent 
                              transition-all duration-300 pointer-events-none"
                ></div>
              </div>
            </div>
          </div>
        }
        data={[
          { label: "Efectivo 💵", value: cashAmountMonthly },
          { label: "Transferencia 📲", value: transferAmountMonthly },
          { label: "Monto total 💲", value: amountMonthly },
        ]}
      />

      <style>{`
        /* Estilos mejorados para options de select */
        select option {
          padding: 12px 16px;
          margin: 4px 0;
          background-color: #ffffff;
          color: #334155;
          font-weight: 500;
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        select option:hover {
          background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
          color: #1e3a8a;
          font-weight: 600;
          padding-left: 20px;
        }

        select option:checked {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: #ffffff;
          font-weight: 600;
        }

        /* Firefox specific styles */
        @-moz-document url-prefix() {
          select option {
            padding: 10px;
          }
          
          select option:hover {
            background-color: #dbeafe;
          }
        }
      `}</style>
    </>
  );
};
