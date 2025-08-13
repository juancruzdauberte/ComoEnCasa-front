import type { ReactNode } from "react";
import { formattedAmount } from "../utils/utilsFunction";

type CardProps = {
  title: string;
  subtitle?: string;
  data: {
    label: string;
    value: number | undefined;
  }[];
  headerExtra?: ReactNode;
};

export const FinanceCard = ({
  title,
  subtitle,
  data,
  headerExtra,
}: CardProps) => {
  return (
    <div className="flex flex-col border-2 border-black rounded-sm p-4 w-[380px] shadow-md h-[250px]">
      <h2 className="text-center text-3xl font-bold">{title}</h2>

      {subtitle && <p className="mt-2 text-lg text-center">{subtitle}</p>}

      {headerExtra && <div className="mt-4">{headerExtra}</div>}

      <div className="flex flex-col gap-2 mt-4">
        {data.map((item, idx) => (
          <p key={idx} className="text-lg flex gap-2">
            <span className="w-32">{item.label}:</span>
            <span className="font-semibold text-xl">
              ${item.value ? formattedAmount(Number(item.value)) : "0"}
            </span>
          </p>
        ))}
      </div>
    </div>
  );
};
