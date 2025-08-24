import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-svh">
      <main>{children}</main>
    </div>
  );
};

export default AuthLayout;
