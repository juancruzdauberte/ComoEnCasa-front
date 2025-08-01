import { BiLastPage } from "react-icons/bi";
import { BiFirstPage } from "react-icons/bi";
import { useOrders } from "../hooks/useOrder";

type Props = {
  page: number;
  setPage: (page: number | ((prev: number) => number)) => void;
};

export const Pagination = ({ page, setPage }: Props) => {
  const { data: orders } = useOrders();
  const totalPages = orders?.pagination.totalPages ?? 1;

  return (
    <section className="flex justify-center items-center gap-4 mt-4">
      {page > 1 && (
        <button
          disabled={page <= 1}
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className=""
        >
          <BiFirstPage />
        </button>
      )}

      <span>
        Página {totalPages === 0 ? 0 : page} de {totalPages}
      </span>

      {totalPages > 0 && page !== totalPages && (
        <button
          disabled={page >= totalPages}
          onClick={() => setPage((p) => p + 1)}
          className=""
        >
          <BiLastPage />
        </button>
      )}
    </section>
  );
};
