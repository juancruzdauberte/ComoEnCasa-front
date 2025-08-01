import { agruparPorCategoria } from "../utils/utils";

type ProductoBase = {
  producto_id: number;
  nombre: string;
  cantidad: number;
  categoria?: string;
};

type ProductosPorCategoriaProps = {
  productos: ProductoBase[];
  editable?: boolean;
  onCantidadChange?: (producto_id: number, cantidad: number) => void;
  onEliminar?: (producto_id: number) => void;
};

export function ProductosCategoria({
  productos,
  editable = false,
  onCantidadChange,
  onEliminar,
}: ProductosPorCategoriaProps) {
  const agrupados = agruparPorCategoria(productos);

  if (productos.length === 0) {
    return (
      <p className="text-gray-500 italic">No hay productos en el pedido</p>
    );
  }

  return (
    <div className="flex gap-5 flex-wrap">
      {Object.entries(agrupados).map(([categoria, prods]) => (
        <div key={categoria}>
          <h3 className="capitalize font-semibold mb-1">{categoria}</h3>
          <ul className="space-y-2">
            {prods.map((prod) => (
              <li key={prod.producto_id} className="flex items-center gap-2">
                <span>Cantidad:</span>
                {editable ? (
                  <input
                    type="number"
                    min={1}
                    className="border border-black w-12 text-center"
                    value={prod.cantidad}
                    onChange={(e) =>
                      onCantidadChange?.(
                        prod.producto_id,
                        Number(e.target.value)
                      )
                    }
                  />
                ) : (
                  <span>{prod.cantidad}</span>
                )}
                <span className="capitalize">- {prod.nombre}</span>
                {editable && (
                  <button
                    type="button"
                    className="ml-auto bg-red-500 text-white px-2 py-0.5 rounded"
                    onClick={() => onEliminar?.(prod.producto_id)}
                  >
                    Eliminar
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
