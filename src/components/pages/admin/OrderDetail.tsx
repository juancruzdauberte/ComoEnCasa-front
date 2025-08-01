import { useParams } from "react-router-dom";
import { useOrder } from "../../hooks/useOrder";

export const OrderDetail = () => {
  const { oid } = useParams();
  const orderId = oid ? parseInt(oid) : undefined;

  const { data: order } = useOrder(orderId!);
  return (
    <section>
      <p>{order?.cliente.apellido}</p>
      <p>{order?.cliente.nombre}</p>
      <p>{order?.observacion}</p>
    </section>
  );
};
