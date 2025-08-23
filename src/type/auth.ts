import { auth } from "@/lib/auth";

export type authType = () => {
  user: typeof auth.$Infer.Session.user | null;
  session: typeof auth.$Infer.Session.session | null;
};
