import { AccordionLayout } from "@/components/layouts/Accordion";
import { Filter as FilterIcon } from "lucide-react";

type Props = {
  filter: string | null;
  setFilter: (filter: string | null) => void;
};

export const Filter = ({ filter, setFilter }: Props) => {
  const filterSections = [
    {
      value: "general",
      title: "General",
      buttons: [
        { value: "todos", label: "Todos" },
        { value: "hoy", label: "Hoy" },
      ],
    },
    {
      value: "fecha",
      title: "Orden por fecha",
      buttons: [
        { value: "asc", label: "Más antiguos" },
        { value: "desc", label: "Más recientes" },
      ],
    },
    {
      value: "estado",
      title: "Estado",
      buttons: [
        { value: "preparando", label: "Preparando" },
        { value: "listo", label: "Listo" },
        { value: "entregado", label: "Entregado" },
        { value: "cancelado", label: "Cancelado" },
      ],
    },
  ];

  return (
    <div
      className="flex flex-col gap-4 p-4 bg-[#FFFFFF] rounded-xl shadow-lg border-2 border-[#BDBDBD]/30
                  hover:shadow-xl hover:shadow-[#424242]/10 transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-center gap-3 pb-3 border-b-2 border-[#BDBDBD]/30">
        <div className="p-2 bg-gradient-to-br from-[#000000] to-[#424242] rounded-lg">
          <FilterIcon size={20} className="text-[#FFFFFF]" />
        </div>
        <h4 className="text-lg font-bold text-[#000000]">Filtros</h4>
      </div>

      {/* Accordion */}
      <AccordionLayout
        sections={filterSections}
        selected={filter}
        setSelected={setFilter}
      />

      {/* Reset button */}
      {filter && filter !== "todos" && (
        <button
          onClick={() => setFilter("todos")}
          className="mt-2 px-4 py-2 bg-[#757575] hover:bg-[#424242] text-[#FFFFFF] rounded-lg
                   font-semibold transition-all duration-300 hover:shadow-lg
                   transform hover:scale-105 active:scale-95"
        >
          Limpiar filtros
        </button>
      )}

      <style>{`
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};
