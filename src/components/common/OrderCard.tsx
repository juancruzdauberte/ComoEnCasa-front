import { useOrder } from "../hooks/useOrder";
import { formattedAmount } from "../utils/utilsFunction";
import { BtnPayOrder } from "./widget/BtnPayOrder";

export const OrderCard = ({ id }: { id: number }) => {
  const { data: order } = useOrder(id);
  return (
    <div className="flex gap-5 border border-black items-center w-auto p-1">
      <div className="flex flex-col">
        <label className="font-semibold">ID:</label>
        <p>{order?.id}</p>
      </div>
      <div className="flex flex-col">
        <label className="font-semibold">Monto:</label>
        <p>${order?.monto && formattedAmount(order.monto)}</p>
      </div>
      <div className="flex flex-col capitalize">
        <label className="font-semibold">Metodo pago:</label>
        <p>{order?.metodo_pago}</p>
      </div>
      <div className="flex flex-col capitalize">
        <label className="font-semibold">Pago:</label>
        <div>
          {order?.fecha_pago ? (
            <span className="text-sm rounded-md px-1 text-green-500 border-green-400 bg-green-100 border">
              Realizado
            </span>
          ) : (
            <div className="flex items-center gap-2">
              <span className=" text-sm rounded-md px-1 text-yellow-500 border-yellow-400 bg-yellow-100 border">
                Pendiente
              </span>
              {order?.id && <BtnPayOrder id={order.id} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
