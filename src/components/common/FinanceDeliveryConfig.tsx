import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { TbEdit, TbEditOff } from "react-icons/tb";

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
    <form
      onSubmit={(e) => {
        e.preventDefault();
        formParam.handleSubmit();
      }}
    >
      <formParam.Field name="valor">
        {(field) => (
          <div className="flex gap-3">
            <div className="flex flex-col">
              <label>Valor a pagar por pedido:</label>
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
                className="w-full mt-1 border border-gray-300 p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="button"
              className="hover:text-gray-400"
              onClick={() => setEditValueParam(!editValueParam)}
            >
              {editValueParam ? <TbEditOff size={25} /> : <TbEdit size={25} />}
            </button>
          </div>
        )}
      </formParam.Field>
      <button
        type="submit"
        disabled={!editValueParam}
        className={` bg-blue-500 text-white p-1 font-semibold rounded-sm mt-2 ${
          editValueParam && "hover:bg-blue-400"
        }  ${!editValueParam && "bg-blue-300"}`}
      >
        Actualizar valor
      </button>
    </form>
  );
};
