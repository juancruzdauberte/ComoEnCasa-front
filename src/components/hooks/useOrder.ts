import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getOrderDetail,
  createOrder,
  getAllOrders,
  updateOrder,
  removeProductFromOrder,
  deleteOrder,
  payOrder,
} from "../services/orders.service";
import { toast } from "sonner";
import type { CreateUpdateOrderResponse, Order } from "../types/types";
import { orderStore } from "../store/orderStore";
import { useUser } from "./useAuth";

export const useOrders = () => {
  const { filter, page } = orderStore();
  const { user } = useUser();
  const limit = user?.rol === "user" ? 1000 : 10;
  return useQuery({
    queryKey: ["orders", filter, page],
    queryFn: () => getAllOrders(filter!, page, limit),
  });
};

export const useOrder = (id: number) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrderDetail(id!),
    enabled: !!id,
    staleTime: 0,
  });
};

export const useCreateOrderMutation = () => {
  const queryClient = useQueryClient();

  const { mutate: createOrderMutate, isPending } = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Pedido creado exitosamente");
    },
    onError: () => {
      toast.error("Error al crear el pedido");
    },
  });
  return { createOrderMutate, isPending };
};

export const useUpdateOrderMutation = () => {
  const queryClient = useQueryClient();
  const { mutate: updateOrderMutate, isPending } = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: CreateUpdateOrderResponse;
    }) => updateOrder(id, data),
    onSuccess: (updatedOrder, variables) => {
      queryClient.setQueryData(["orders"], (oldOrders: Order[]) => {
        if (!oldOrders) return oldOrders;
        return oldOrders.map((order: Order) =>
          order.id === variables.id ? { ...order, ...updatedOrder } : order
        );
      });

      queryClient.setQueryData(["order", variables.id], (oldOrder: Order) => ({
        ...oldOrder,
        ...updatedOrder,
      }));

      toast.success("Pedido actualizado correctamente");
    },
    onError: () => {
      toast.error("Error al actualizar el pedido");
    },
  });

  return { updateOrderMutate, isPending };
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      toast.success("Pedido eliminado correctamente");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

export const usePayOrder = () => {
  const queryClient = useQueryClient();

  const { mutate: payOrderMutation } = useMutation({
    mutationFn: (id: number) => payOrder(id),
    onSuccess: (_, id) => {
      toast.success("Pago registrado correctamente");
      queryClient.invalidateQueries({ queryKey: ["order", id] });
    },
    onError: () => {
      toast.error("Error al registrar el pago");
    },
  });

  return { payOrderMutation };
};

export const useRemoveProductFromOrder = () => {
  const queryClient = useQueryClient();

  const { mutate: removeProduct } = useMutation({
    mutationFn: ({
      pedidoId,
      productoId,
    }: {
      pedidoId: number;
      productoId: number;
    }) => removeProductFromOrder(pedidoId, productoId),

    onSuccess: (_, variables) => {
      toast.success("Producto eliminado del pedido");
      queryClient.invalidateQueries({
        queryKey: ["order", variables.pedidoId],
      });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },

    onError: () => {
      toast.error("Error al eliminar el producto");
    },
  });

  return { removeProduct };
};
