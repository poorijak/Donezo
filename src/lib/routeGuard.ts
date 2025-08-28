import { headers } from "next/headers";
import { auth } from "./auth";

export const authCheck = async () => {
  const user = (await auth.api.getSession({ headers: await headers() }))?.user;
  return user
    ? (({ id, email, name, image }) => ({ id, email, name, image }))(user)
    : null;
};
