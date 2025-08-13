import { usePayOrder } from "@/components/hooks/useOrder";
import { TbCashRegister } from "react-icons/tb";
import { toast } from "sonner";

export const BtnPayOrder = ({ id }: { id: number }) => {
  const { payOrderMutation } = usePayOrder();
  return (
    <button
      onClick={() => {
        toast.warning(`¿Estás seguro de que quieres pagar el pedido ${id}?`, {
          duration: 2000,
          action: {
            label: "Pagar",
            onClick: () => payOrderMutation(id),
          },
        });
      }}
      type="button"
      className="border rounded-md border-orange-400 p-1 font-semibold bg-orange-400 text-white"
    >
      <TbCashRegister />
    </button>
  );
};
