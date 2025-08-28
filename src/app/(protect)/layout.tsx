import HeaderUser from "@/components/headers/layout/headers";
import { authCheck } from "@/lib/routeGuard";
import { redirect } from "next/navigation";
import React from "react";

interface ProtectLayoutProps {
  children: React.ReactNode;
}

const ProtectLayout = async ({ children }: ProtectLayoutProps) => {
  const user = await authCheck();

  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <div>
      <HeaderUser user={user} />
      {children}
    </div>
  );
};

export default ProtectLayout;
