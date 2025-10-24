export type GetOrdersResponse = {
  data: Order[];
  pagination: {
    currentPage: number;
    totalItems: number;
    totalPages: number;
  };
};

export type GetProductosResponse = {
  id: number;
  nombre: string;
  categoriaId: number;
  categoria: string;
}[];

export type CreateProductResponse = {
  nombre: string;
  categoria_id: number;
};

export type CreateCategoryResponse = {
  nombre: string;
};
export type OrderDetailResponse = {
  pedido: Order;
};

export type CategorysResponse = {
  id: number;
  nombre: string;
}[];

export type GetClientResponse = {
  nombre: string;
  apellido: string;
};

export type GetAmountTodayResponse = {
  total: number;
};

export type GetPriceToPayResponse = {
  valor: number;
};

export type UpdateParamName = {
  valor: number;
  nombreParametro: string;
};

export type CreateUpdateOrderResponse = {
  productos: { producto_id: number; cantidad: number }[];
  domicilio: string;
  estado: "preparando" | "entregado" | "listo" | "cancelado";
  hora_entrega: string | null;
  observacion: string | null;
  metodo_pago: "efectivo" | "transferencia" | "";
  monto: number | null;
};

export type RefreshResponse = {
  accessToken: string;
};

export type Producto = {
  nombre: string;
  categoria: string;
  producto_id: number;
  cantidad: number;
};

export type Order = {
  id: number;
  domicilio: string;
  fecha_pedido: string;
  hora_entrega: null | string;
  monto: number | null;
  metodo_pago: "efectivo" | "transferencia";
  observacion: string;
  estado: "preparando" | "entregado" | "listo" | "cancelado";
  fecha_pago: Date | null;
  productos: Producto[];
};

export type Customer = {
  nombre: string;
  apellido: string;
  telefono: string;
};

export type User = {
  email: string;
  avatar: string;
  rol: "admin" | "user";
};
