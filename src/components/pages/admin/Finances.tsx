import { useEffect, useState } from "react";
import {
  useAmountMonthly,
  useAmountToday,
  useCashAmountMonthly,
  useCashAmountToday,
  useDeliveryAmountToPay,
  useValueFinanceParam,
  useTransferAmountMonthly,
  useTransferAmountToday,
  useUpdateValueParam,
  useCashAmountDelivery,
} from "../../hooks/useFinance";
import { FinanceCard } from "../../common/FinanceCard";
import { AccordionLayout } from "@/components/layouts/Accordion";
import { useOrders } from "@/components/hooks/useOrder";
import { OrderCard } from "@/components/common/OrderCard";
import { useForm } from "@tanstack/react-form";
import type { UpdateParamName } from "@/components/types/types";
import { TbEditOff } from "react-icons/tb";
import { TbEdit } from "react-icons/tb";
import { orderStore } from "@/components/store/orderStore";
import { toLocalDateStringUTC3 } from "@/components/utils/utilsFunction";

export const Finances = () => {
  const { data: amountToday } = useAmountToday();
  const { data: cashAmountToday } = useCashAmountToday();
  const { data: transferAmountToday } = useTransferAmountToday();
  const { data: cashDeliveryAmount } = useCashAmountDelivery();
  const actuallyYear = new Date().getFullYear();
  const actuallyMonth = new Date().getMonth() + 1;
  const [year, setYear] = useState<number>(actuallyYear);
  const [month, setMonth] = useState<number>(actuallyMonth);
  const [valueAccordion, setValueAccordion] = useState<string | null>(
    "pedidos-hoy"
  );
  const { setFilter, setLimit } = orderStore();
  const { data: amountMonthly } = useAmountMonthly(month, year);
  const { data: transferAmountMonthly } = useTransferAmountMonthly(month, year);
  const { data: cashAmountMonthly } = useCashAmountMonthly(month, year);
  const { data: orders } = useOrders();
  const { data: amountToPay } = useDeliveryAmountToPay();
  const { data: priceDeliveryBiker } = useValueFinanceParam("monto_por_pedido");
  const { updateValueParam } = useUpdateValueParam();
  const [editValueParam, setEditValueParam] = useState<boolean>(false);

  useEffect(() => {
    setFilter("hoy");
  }, [setFilter]);

  useEffect(() => {
    setLimit(100);
  }, [setLimit]);

  const formParam = useForm({
    defaultValues: {
      valor: priceDeliveryBiker?.valor,
      nombreParametro: "monto_por_pedido",
    } as UpdateParamName,
    onSubmit: ({ value }) => {
      updateValueParam({
        value: value.valor,
        paramName: value.nombreParametro,
      });
      setEditValueParam(false);
    },
  });
  const sectionsData = [
    {
      value: "pedidos",
      title: "Pedidos",
      buttons: [
        { value: "pedidos-hoy", label: "Total de hoy" },
        { value: "pedidos-mes", label: "Total del mes" },
      ],
    },
    {
      value: "delivery",
      title: "Delivery",
      buttons: [
        { value: "delivery-hoy", label: "Total de hoy" },
        { value: "delivery-config", label: "Configuración" },
      ],
    },
  ];
  return (
    <section className="flex flex-col items-center justify-center gap-16">
      <div className="flex flex-col gap-2 mt-10">
        <h1 className="font-bold text-4xl text-center">Finanzas</h1>
        <em className="text-gray-400 text-center">
          Recordá que para que se registre dicho monto se debe completar el pago
          del pedido.
        </em>
      </div>

      <div className="flex w-full px-7">
        <div className="w-1/6">
          <AccordionLayout
            selected={valueAccordion}
            setSelected={setValueAccordion}
            sections={sectionsData}
          />
        </div>

        <div className="flex justify-center w-full">
          {valueAccordion === "pedidos-hoy" && (
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
                  <span className="font-semibold">{orders?.data.length}</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {orders?.data.map((o) => (
                  <div key={o.id}>
                    <OrderCard id={o.id} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {valueAccordion === "delivery-hoy" && (
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
                  Pedidos totales:
                  <span className="font-semibold">
                    {" "}
                    {orders?.data.filter((o) => o.domicilio !== "busca").length}
                  </span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {orders?.data.map((o) => (
                  <div key={o.id}>
                    {o.domicilio !== "busca" && <OrderCard id={o.id} />}
                  </div>
                ))}
              </div>
            </div>
          )}

          {valueAccordion === "delivery-config" && (
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
                      {editValueParam ? (
                        <TbEditOff size={25} />
                      ) : (
                        <TbEdit size={25} />
                      )}
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
          )}
          {valueAccordion === "pedidos-mes" && (
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
                { label: "Efectivo 💵", value: cashAmountMonthly },
                { label: "Transferencia 📲", value: transferAmountMonthly },
                { label: "Monto total 💲", value: amountMonthly },
              ]}
            />
          )}
        </div>
      </div>
    </section>
  );
};
