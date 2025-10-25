import { memo } from "react";
import { ClipLoader } from "react-spinners";

// OPTIMIZACIÓN: Memoizar el componente Spinner
export const Spinner = memo(function Spinner({ 
  text, 
  size 
}: { 
  text?: string; 
  size?: number;
}) {
  return (
    <div className="flex flex-col items-center gap-3 animate-fadeIn gpu-accelerated">
      <div className="relative gpu-accelerated">
        <ClipLoader size={size || 30} color="#000000" />
        <div className="absolute inset-0 animate-ping">
          <ClipLoader size={size || 30} color="#BDBDBD" />
        </div>
      </div>
      {text && (
        <p className="font-semibold text-gray-700 animate-pulse-slow">
          {text}
        </p>
      )}
    </div>
  );
});
