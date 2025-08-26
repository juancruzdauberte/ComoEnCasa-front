import { useOrders } from "../hooks/useOrder";
import { useEffect } from "react";
import { Filter } from "../common/widget/Filter";
import { renderUserOrders } from "../utils/utils";
import { useUser } from "../hooks/useAuth";
import { OrdersTable } from "../common/OrdersTable";
import { Pagination } from "../common/widget/Pagination";
import { orderStore } from "../store/orderStore";

export const OrderLayout = () => {
  const { user } = useUser();
  const { page, setPage, filter, setFilter, setLimit } = orderStore();
  const isUser = user?.rol === "user";

  useEffect(() => {
    if (user?.rol === "user") setFilter("hoy");
  }, [user, setFilter]);

  useEffect(() => {
    setLimit(user?.rol === "user" ? 100 : 10);
  }, [setLimit, user?.rol]);

  const { data: orders, isLoading } = useOrders();
  const noOrders = orders?.data.length === 0;

  return (
    <section>
      {!noOrders && isUser && renderUserOrders(orders!)}

      {!isUser && (
        <section className="flex gap-14 w-full px-32">
          <div className="flex flex-col gap-5 w-1/6">
            <Filter filter={filter} setFilter={setFilter} />
            <p>
              Pedidos filtrados:{" "}
              <span className="font-semibold">
                {orders?.pagination.totalItems}
              </span>
            </p>
          </div>
          <div className="w-11/12">
            <OrdersTable filteredTrips={orders?.data} isFetching={isLoading} />
            {!noOrders && <Pagination setPage={setPage} page={page} />}
          </div>
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
