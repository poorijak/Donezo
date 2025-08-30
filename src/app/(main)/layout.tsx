import HeaderUser from "@/components/headers/layout/headers";
import { authCheck } from "@/lib/routeGuard";
import { userType } from "@/types/user";
import { redirect } from "next/navigation";
import React from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = async ({ children }: MainLayoutProps) => {
  const user = await authCheck();

  return (
    <div className="mt-20">
      <HeaderUser user={user} />
      {children}
    </div>
  );
};

export default MainLayout;
