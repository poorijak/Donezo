import AuthForm from "@/feature/auth/components/authForm";
import AuthHeader from "@/feature/auth/components/authHeder";
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
