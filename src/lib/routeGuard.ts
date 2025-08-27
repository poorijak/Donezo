import { cookies } from "next/headers";

export const authCheck = async () => {
  const cookieStore = cookies();
  const session = (await cookieStore).get("better-auth.session_token");

  return session;
};
