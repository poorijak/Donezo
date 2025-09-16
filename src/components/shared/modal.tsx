import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string | undefined;
  desc?: string | null | undefined;
  children: React.ReactNode;
  className?: string;
}

const Modal = ({
  open,
  onOpenChange,
  title,
  desc,
  children,
  className,
}: ModalProps) => {
  return (
    <div>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className={cn("sm:max-w-sm", className)}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{desc}</DialogDescription>
          </DialogHeader>

          {children}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Modal;
