import React from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

interface SubmitBtnProp extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  pending?: boolean;
}

const SubmitBtn = ({ name, pending, ...props }: SubmitBtnProp) => {
  return (
    <Button type="submit" {...props} disabled={pending}>
      {pending ? <Loader2 className="animate-spin" /> : <>{name}</>}
    </Button>
  );
};

export default SubmitBtn;
