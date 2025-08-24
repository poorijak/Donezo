import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { FcGoogle } from "react-icons/fc";

const AuthFooter = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center gap-5">
        <div className="h-px flex-1 bg-gray-300"></div>
        <span className="text-xs text-gray-400  font-bold">or</span>
        <div className="h-px flex-1 bg-gray-300"></div>
      </div>

      <Button variant="outline" className="w-full flex items-center justify-center">
        <FcGoogle />
        Login with google
      </Button>
    </div>
  );
};

export default AuthFooter;
