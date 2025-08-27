import { signinSchema, signupSchema } from "@/feature/auth/schema/auth";
import { auth } from "@/lib/auth";
import z from "zod";

export type authType = () => {
  user: typeof auth.$Infer.Session.user | null;
  session: typeof auth.$Infer.Session.session | null;
};

export type signinValue = z.infer<typeof signinSchema>;
export type signupValue = z.infer<typeof signupSchema>;

export type AuthValue = signinValue | signupValue;
