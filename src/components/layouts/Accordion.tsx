import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/ui/components/ui/accordion";

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
      {sections.map((section) => (
        <AccordionItem key={section.value} value={section.value}>
          <AccordionTrigger
            className={`text-md ${
              section.buttons.some((btn) => btn.value === selected)
                ? "border-b-2 text-blue-500 border-blue-500"
                : ""
            }`}
          >
            {section.title}
          </AccordionTrigger>
          <AccordionContent className="flex flex-col text-balance">
            <div className="flex flex-col items-start mt-3 gap-3 ml-2">
              {section.buttons.map((btn) => (
                <button
                  key={btn.value}
                  className={`${
                    selected === btn.value
                      ? "text-blue-500 border-b border-blue-500"
                      : ""
                  }`}
                  onClick={() => setSelected(btn.value)}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
