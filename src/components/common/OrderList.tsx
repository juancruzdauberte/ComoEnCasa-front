import { useOrders } from "../hooks/useOrder";
import { useEffect } from "react";
import { Filter } from "./Filter";
import { renderUserOrders } from "../utils/utils";
import { useUser } from "../hooks/useAuth";
import { OrdersTable } from "./OrdersTable";
import { Pagination } from "./Pagination";
import { orderStore } from "../store/orderStore";

export const OrderList = () => {
  const { user } = useUser();
  const { page, setPage, filter, setFilter } = orderStore();
  const isUser = user?.rol === "user";

  useEffect(() => {
    if (user?.rol === "user") setFilter("hoy");
  }, [user, setFilter]);

  const { data: orders } = useOrders();
  console.log(orders);
  const noOrders = orders?.data.length === 0;

  return (
    <section>
      {!noOrders && isUser && renderUserOrders(orders!)}

      {!isUser && (
        <section>
          <Filter filter={filter} setFilter={setFilter} />
          <OrdersTable filteredTrips={orders?.data} />
          {!noOrders && <Pagination setPage={setPage} page={page} />}
        </section>
      )}

      {noOrders && isUser && (
        <p className="bg-gray-100 rounded-full px-6 py-2 text-center text-gray-600 w-fit mx-auto mt-10 shadow-sm">
          Aún no hay pedidos para el día de hoy
        </p>
      )}
    </section>
  );
};
