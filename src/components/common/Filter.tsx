import { AccordionLayout } from "../layouts/Accordion";

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
    <div className="flex flex-col gap-3">
      <h4 className="text-lg font-semibold">Filtrar por:</h4>
      <AccordionLayout
        sections={filterSections}
        selected={filter}
        setSelected={setFilter}
      />
    </div>
  );
};
