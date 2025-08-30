import React from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

interface SubmitBtnProp extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  pending?: boolean;
}

const SubmitBtn = ({ title, pending, ...props }: SubmitBtnProp) => {
  return (
    <Button type="submit" {...props} disabled={pending}>
      {pending ? <Loader2 className="animate-spin" /> : <>{title}</>}
    </Button>
  );
};

export default SubmitBtn;
