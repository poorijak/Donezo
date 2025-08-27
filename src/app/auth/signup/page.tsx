import AuthForm from "@/feature/auth/components/auth-form";
import AuthHeader from "@/feature/auth/components/auth-header";
import React from "react";

const page = () => {
  const type = "signup";

  return (
    <div>
      <AuthHeader type={type}>
        <AuthForm type={type} />
      </AuthHeader>
    </div>
  );
};

export default page;
