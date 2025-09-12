import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { TagType } from "@/types/task";
import React from "react";

interface TagSelectorProps {
  data: TagType[] | undefined;
  selected: string[] | undefined;
  setSelected: (val: string[]) => void;
}

const TagSelector = ({ data, setSelected, selected }: TagSelectorProps) => {


  const existingSelected = (dataId: string) => !!selected?.includes(dataId);
  const handleSelected = (dataId: string) => {
    const prev = selected ?? [];
    const next = prev.includes(dataId)
      ? prev.filter((id) => id !== dataId)
      : [...prev, dataId];
    setSelected(next);
  };

  return (
    <div className="flex flex-col gap-3">
      <Label>Task Tag</Label>
      <div className="min-w-full">
        {!data ? (
          <p>Not found tag , Please try again</p>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-3 md:grid-cols-3">
              {data.map((t) => (
                <div
                  key={t.id}
                  style={{ backgroundColor: "" }}
                  onClick={() => handleSelected(t.id)}
                  className={cn(
                    "bg-card text-primary flex w-auto cursor-pointer items-center justify-center gap-2 rounded-full border px-4 py-2 text-xs transition-all duration-100 md:px-2",
                    existingSelected(t.id) &&
                      "bg-primary/90 text-card font-bold",
                    (selected?.length ?? 0) >= 2 &&
                      !existingSelected(t.id) &&
                      "pointer-events-none opacity-50",
                  )}
                >
                  {t.icon}
                  <span>{t.title}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TagSelector;
