import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { Edit3, Save, X, DollarSign, Bike } from "lucide-react";

type Props = {
  priceDeliveryBiker: number | undefined;
  updateValueParam: (data: { value: number; paramName: string }) => void;
};
export const FinanceDeliveryConfig = ({
  priceDeliveryBiker,
  updateValueParam,
}: Props) => {
  const [editValueParam, setEditValueParam] = useState(false);

  const formParam = useForm({
    defaultValues: {
      valor: priceDeliveryBiker ?? 0,
      nombreParametro: "monto_por_pedido",
    },
    onSubmit: ({ value }) => {
      updateValueParam({
        value: value.valor,
        paramName: value.nombreParametro,
      });
      setEditValueParam(false);
    },
  });

  return (
    <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-2xl shadow-lg border border-blue-100 p-6 transition-all duration-300 hover:shadow-xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
          <Bike className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-800">
            Configuración de Delivery
          </h3>
          <p className="text-sm text-slate-500">
            Establece el valor por pedido
          </p>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          formParam.handleSubmit();
        }}
        className="space-y-5"
      >
        <formParam.Field name="valor">
          {(field) => (
            <div className="space-y-3">
              {/* Label */}
              <label className="flex items-center gap-2 font-semibold text-slate-700">
                <DollarSign className="w-5 h-5 text-blue-500" />
                Valor a pagar por pedido
              </label>

              {/* Input Group */}
              <div className="relative group">
                <div className="flex items-center gap-3">
                  {/* Input Container */}
                  <div className="relative flex-1">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-800 font-semibold text-lg">
                      $
                    </span>
                    <input
                      type="text"
                      value={
                        field.state.value &&
                        new Intl.NumberFormat("es-AR", {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }).format(field.state.value)
                      }
                      onChange={(e) => {
                        const soloNumeros = e.target.value.replace(/\D/g, "");
                        field.handleChange(Number(soloNumeros));
                      }}
                      disabled={!editValueParam}
                      className={`w-full pl-10 pr-4 py-3.5 bg-white border-2 rounded-xl font-semibold text-lg
                               transition-all duration-300 outline-none
                               ${
                                 editValueParam
                                   ? "border-blue-500 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 text-slate-800"
                                   : "border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed"
                               }`}
                      placeholder="0"
                    />
                    {editValueParam && (
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-transparent pointer-events-none"></div>
                    )}
                  </div>

                  {/* Toggle Edit Button */}
                  <button
                    type="button"
                    onClick={() => setEditValueParam(!editValueParam)}
                    className={`p-3.5 rounded-xl font-semibold transition-all duration-300 shadow-lg
                             flex items-center gap-2 min-w-[110px] justify-center
                             ${
                               editValueParam
                                 ? "bg-gradient-to-br from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 hover:scale-105"
                                 : "bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 hover:scale-105"
                             }`}
                  >
                    {editValueParam ? (
                      <>
                        <X className="w-5 h-5" />
                        <span>Cancelar</span>
                      </>
                    ) : (
                      <>
                        <Edit3 className="w-5 h-5" />
                        <span>Editar</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </formParam.Field>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!editValueParam}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg
                   flex items-center justify-center gap-3
                   ${
                     editValueParam
                       ? "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 hover:scale-[1.02] hover:shadow-xl"
                       : "bg-slate-200 text-slate-400 cursor-not-allowed opacity-60"
                   }`}
        >
          <Save className="w-6 h-6" />
          <span>{editValueParam ? "Guardar Cambios" : "Actualizar Valor"}</span>
        </button>
      </form>

      <style>{`
        @keyframes pulse-subtle {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        input:disabled {
          animation: pulse-subtle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
