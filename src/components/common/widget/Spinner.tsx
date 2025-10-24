import { ClipLoader } from "react-spinners";

export const Spinner = ({ text, size }: { text?: string; size?: number }) => {
  return (
    <div className="flex flex-col items-center gap-3 animate-fade-in">
      <div className="relative">
        <ClipLoader size={size || 30} color="#000000" />
        <div className="absolute inset-0 animate-ping">
          <ClipLoader size={size || 30} color="#BDBDBD" />
        </div>
      </div>
      {text && (
        <p className="font-semibold text-[#424242] animate-pulse">{text}</p>
      )}
    </div>
  );
};
