import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getOrderDetail,
  createOrder,
  getAllOrders,
  updateOrder,
  payOrderDate,
  removeProductFromOrder,
  deleteOrder,
} from "../services/orders.service";
import { toast } from "sonner";
import type { Order } from "../types/types";
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
  const { mutate: createOrderMutate } = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      toast.success("Pedido creado exitosamente");
    },
    onError: () => {
      toast.error("Error al crear el pedido");
    },
  });
  return { createOrderMutate };
};

export const useUpdateOrderMutation = () => {
  const queryClient = useQueryClient();
  const { mutate: updateOrderMutate } = useMutation({
    mutationFn: ({ id, data }: { id: number | null; data: Partial<Order> }) =>
      updateOrder(id!, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["order", variables.id] });
      toast.success("Pedido actualizado correctamente");
    },
    onError: () => {
      toast.error("Error al actualizar el pedido");
    },
  });

  return { updateOrderMutate };
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

  const { mutate: payOrder } = useMutation({
    mutationFn: ({ id, date }: { id: number; date: string }) =>
      payOrderDate(id, date),
    onSuccess: (_, variables) => {
      toast.success("Pago registrado correctamente");
      queryClient.invalidateQueries({ queryKey: ["order", variables.id] });
    },
    onError: () => {
      toast.error("Error al registrar el pago");
    },
  });

  return { payOrder };
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
