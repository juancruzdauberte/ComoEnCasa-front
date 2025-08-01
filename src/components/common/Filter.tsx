type Props = {
  filter: string | null;
  setFilter: (filter: string | null) => void;
};

export const Filter = ({ filter, setFilter }: Props) => {
  return (
    <select
      name="filtro"
      id="filtro"
      onChange={(e) => setFilter(e.target.value)}
      value={filter ?? "desc"}
      className="mb-4 border border-black w-28 text-sm "
    >
      <option value="todos">Todos</option>
      <option value="hoy">Hoy</option>
      <optgroup label="Orden por fecha">
        <option value="asc">Más antiguos</option>
        <option value="desc">Más recientes</option>
      </optgroup>
      <optgroup label="Estado">
        <option value="preparando">Preparando</option>
        <option value="listo">Listo</option>
        <option value="entregado">Entregado</option>
        <option value="cancelado">Cancelado</option>
      </optgroup>
    </select>
  );
};
