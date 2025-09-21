import React from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

interface SubmitBtnProp extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  pending?: boolean;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  size?: "default" | "sm" | "lg" | "icon" | null | undefined;
}

const SubmitBtn = ({
  title,
  pending,
  variant,
  size,
  ...props
}: SubmitBtnProp) => {
  return (
    <Button
      type="submit"
      {...props}
      size={size}
      variant={variant}
      disabled={pending}
    >
      {pending ? <><Loader2 className="h-4 w-4 animate-spin" />Please wait...</> : <>{title}</>}
    </Button>
  );
};

export default SubmitBtn;
