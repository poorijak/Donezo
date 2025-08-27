import { authCheck } from "@/lib/routeGuard";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {

  const user = await authCheck()

  if (!user) {
    redirect("/auth/signin")
  }
  
  return (
    <div>
      home
    </div>
  );
}
