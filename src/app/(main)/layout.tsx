import HeaderUser from "@/components/headers/layout/headers";
import { authCheck } from "@/lib/routeGuard";
import React from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = async ({ children }: MainLayoutProps) => {
  const user = await authCheck();

  return (
    <div>
      <HeaderUser user={user} />
      <div>{children}</div>
    </div>
  );
};

export default MainLayout;
