import { usePayOrder } from "@/components/hooks/useOrder";
import { DollarSign } from "lucide-react";
import { toast } from "sonner";

export const BtnPayOrder = ({ id }: { id: number }) => {
  const { payOrderMutation } = usePayOrder();
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        toast.warning(
          `¿Estás seguro de que quieres marcar como pagado el pedido #${id}?`,
          {
            duration: 3000,
            action: {
              label: "Confirmar Pago",
              onClick: () => payOrderMutation(id),
            },
          }
        );
      }}
      type="button"
      className="p-1.5 rounded-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700
               text-[#FFFFFF] transition-all duration-300 hover:scale-110 group/btn relative overflow-hidden
               shadow-md hover:shadow-lg border border-green-600"
      title="Marcar como pagado"
    >
      <DollarSign
        size={18}
        className="group-hover/btn:scale-110 transition-transform duration-300"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                    opacity-0 group-hover/btn:opacity-100 transform -translate-x-full group-hover/btn:translate-x-full 
                    transition-all duration-700 pointer-events-none"
      ></div>
    </button>
  );
};
