import React from "react";
import { ChevronDown, Search } from "lucide-react";

type Header = {
  label: string;
  key: string;
};

type Props<T> = {
  headers: Header[];
  data: T[];
  renderRow: (item: T) => React.ReactNode;
  noDataMessage?: string | boolean;
  onRowClick?: (item: T) => void;
};

export function Table<T>({
  headers,
  data,
  renderRow,
  noDataMessage,
  onRowClick,
}: Props<T>) {
  return (
    <div className="w-full overflow-hidden">
      <div className="bg-white rounded-2xl shadow-xl border border-[#BDBDBD]/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-[#000000] via-[#424242] to-[#000000]">
                {headers.map((header, index) => (
                  <th
                    key={header.key}
                    className="text-left p-4 text-[#FFFFFF] font-bold uppercase text-sm tracking-wider
                               border-b-2 border-[#757575] relative group"
                    style={{
                      animation: `slideDown 0.4s ease-out ${
                        index * 0.05
                      }s both`,
                    }}
                  >
                    <div className="flex items-center gap-2">
                      {header.label}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ChevronDown size={16} className="text-[#BDBDBD]" />
                      </div>
                    </div>
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                                 opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full 
                                 transition-all duration-700 pointer-events-none"
                    ></div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-[#BDBDBD]/30">
              {data.length === 0 ? (
                <tr>
                  <td colSpan={headers.length} className="text-center p-16">
                    <div className="flex flex-col items-center gap-4 animate-fade-in">
                      <div
                        className="w-24 h-24 rounded-full bg-gradient-to-br from-[#BDBDBD]/20 to-[#757575]/20 
                                   flex items-center justify-center animate-pulse"
                      >
                        <Search size={40} className="text-[#757575]" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-[#424242] font-semibold text-lg">
                          {noDataMessage || "No hay datos disponibles"}
                        </p>
                        <p className="text-[#757575] text-sm">
                          Los registros aparecerán aquí cuando estén disponibles
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                data.map((item, index) => (
                  <tr
                    key={index}
                    // Se aplica el onRowClick aquí
                    onClick={() => onRowClick && onRowClick(item)}
                    className="group relative transition-all duration-300 hover:bg-gradient-to-r hover:from-[#BDBDBD]/10 hover:to-transparent
                               cursor-pointer even:bg-[#BDBDBD]/5"
                    style={{
                      animation: `fadeInRow 0.4s ease-out ${
                        index * 0.05
                      }s both`,
                    }}
                  >
                    {renderRow(item)}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer decorativo (sin cambios) */}
        {data.length > 0 && (
          <div
            className="bg-gradient-to-r from-[#BDBDBD]/10 to-transparent px-4 py-3 
                       border-t border-[#BDBDBD]/30"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-[#757575]">
                Mostrando{" "}
                <span className="font-semibold text-[#424242]">
                  {data.length}
                </span>{" "}
                registro{data.length !== 1 ? "s" : ""}
              </p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs text-[#757575]">Actualizado</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Estilos (Se limpiaron los @apply) */}
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInRow {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
