import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
            <div className="grid grid-cols-3 md:grid-cols-3 gap-3">
              {data.map((t) => (
                <div
                  key={t.id}
                  style={{ backgroundColor: "" }}
                  onClick={() => handleSelected(t.id)}
                  className={cn(
                    "px-4 md:px-2 w-auto items-center gap-2 justify-center py-2 bg-card text-primary border rounded-full transition-all flex duration-100 text-xs  cursor-pointer",
                    existingSelected(t.id) &&
                      "bg-primary/90 text-card font-bold"
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
