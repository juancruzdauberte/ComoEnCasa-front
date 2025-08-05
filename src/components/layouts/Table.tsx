import React from "react";

type Header = {
  label: string;
  key: string;
};

type Props<T> = {
  headers: Header[];
  data: T[];
  renderRow: (item: T) => React.ReactNode;
  noDataMessage?: string | boolean;
};

export function Table<T>({
  headers,
  data,
  renderRow,
  noDataMessage = "No hay resultados",
}: Props<T>) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-600 text-white">
          {headers.map((header) => (
            <th key={header.key} className="text-left p-3">
              {header.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td
              colSpan={headers.length}
              className="text-center text-gray-500 italic p-16"
            >
              {noDataMessage}
            </td>
          </tr>
        ) : (
          data.map((item) => renderRow(item))
        )}
      </tbody>
    </table>
  );
}
