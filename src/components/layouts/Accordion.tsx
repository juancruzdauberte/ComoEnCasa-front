import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/ui/components/ui/accordion";
import { ChevronRight } from "lucide-react";

type AccordionSection = {
  value: string;
  title: string;
  buttons: {
    value: string;
    label: string;
  }[];
};

type Props = {
  selected: string | null;
  setSelected: (value: string | null) => void;
  sections: AccordionSection[];
};

export function AccordionLayout({ selected, setSelected, sections }: Props) {
  return (
    <Accordion type="single" collapsible>
      {sections.map((section, index) => (
        <AccordionItem 
          key={section.value} 
          value={section.value}
          className="border-b border-[#BDBDBD]/30 last:border-0"
          style={{
            animation: `slideIn 0.3s ease-out ${index * 0.1}s both`
          }}
        >
          <AccordionTrigger
            className={`text-md font-semibold py-4 px-2 rounded-lg transition-all duration-300
              hover:bg-[#BDBDBD]/10 group
              ${
              section.buttons.some((btn) => btn.value === selected)
                ? "text-[#000000] bg-[#BDBDBD]/10"
                : "text-[#424242] hover:text-[#000000]"
            }`}
          >
            <div className="flex items-center gap-2">
              <div className={`w-1 h-6 rounded-full transition-all duration-300 
                            ${section.buttons.some((btn) => btn.value === selected)
                              ? "bg-[#000000]"
                              : "bg-transparent group-hover:bg-[#757575]"
                            }`}
              ></div>
              {section.title}
            </div>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col text-balance">
            <div className="flex flex-col items-start mt-2 gap-2 ml-4">
              {section.buttons.map((btn, btnIndex) => (
                <button
                  key={btn.value}
                  className={`w-full text-left py-2.5 px-4 rounded-lg transition-all duration-300 
                            group relative overflow-hidden
                            ${
                    selected === btn.value
                      ? "bg-gradient-to-r from-[#000000] to-[#424242] text-[#FFFFFF] font-semibold shadow-lg"
                      : "text-[#757575] hover:text-[#000000] hover:bg-[#BDBDBD]/10"
                  }`}
                  onClick={() => setSelected(btn.value)}
                  style={{
                    animation: `fadeIn 0.3s ease-out ${btnIndex * 0.05}s both`
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span>{btn.label}</span>
                    <ChevronRight 
                      size={16} 
                      className={`transition-all duration-300 
                                ${selected === btn.value 
                                  ? "opacity-100 translate-x-0" 
                                  : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                                }`}
                    />
                  </div>

                  {/* Indicador activo */}
                  {selected === btn.value && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#FFFFFF] rounded-r-full"></div>
                  )}

                  {/* Efecto de hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                                opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full 
                                transition-all duration-700 pointer-events-none"></div>
                </button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </Accordion>
  );
}
