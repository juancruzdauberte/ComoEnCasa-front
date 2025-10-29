import { api } from "../config/axios";
import type {
  CreateUpdateOrderResponse,
  GetOrdersResponse,
  Order,
} from "../types/types";

export async function getAllOrders(
  filter: string,
  page?: number,
  limit?: number
): Promise<GetOrdersResponse> {
  try {
    const { data } = await api.get<GetOrdersResponse>(
      `/orders?filter=${filter}&page=${page}&limit=${limit}`
    );
    return data;
  } catch (error) {
    console.error(error);
    return {
      data: [],
      pagination: { currentPage: 0, totalItems: 0, totalPages: 0 },
    };
  }
}

export async function getOrderDetail(id: number): Promise<Order> {
  try {
    const { data } = await api.get<Order>(`/orders/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("No se pudo obtener el detalle del pedido");
  }
}

export async function updateOrder(
  id: number,
  dataUpdated: CreateUpdateOrderResponse
) {
  const {
    productos,
    domicilio,
    metodo_pago,
    monto,
    observacion,
    estado,
    hora_entrega,
    apellido_cliente,
  } = dataUpdated;
  try {
    const { data } = await api.put<Order>(`/orders/${id}`, {
      productos,
      domicilio,
      metodo_pago,
      monto,
      hora_entrega,
      observacion,
      estado,
      apellido_cliente,
    });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("No se pudo actualizar el pedido");
  }
}

export async function payOrder(id: number) {
  try {
    const { data } = await api.post(`/orders/pay/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error al realizar el pago del pedido");
  }
}

export async function createOrder(order: CreateUpdateOrderResponse) {
  try {
    const { data } = await api.post<CreateUpdateOrderResponse>(
      "/orders",
      order
    );
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("No se pudo crear el pedido");
  }
}

export async function deleteOrder(orderId: number) {
  try {
    const { data } = await api.delete(`/orders/${orderId}`);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function removeProductFromOrder(
  orderId: number,
  productId: number
) {
  try {
    const { data } = await api.delete(
      `/orders/${orderId}/product/${productId}`
    );
    return data;
  } catch (error) {
    console.error(error);
  }
}
