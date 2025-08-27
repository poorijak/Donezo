import AuthEmailVerify from "@/feature/auth/components/auth-email-verify";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {

  const cookieStore = await cookies()
  const email = cookieStore.get("pending-email")?.value

  return (
    <div>
      <AuthEmailVerify email={email}/>
    </div>
  );
};

export default page;
