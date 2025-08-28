import { auth } from "@/lib/auth";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { signinSchema, signupSchema } from "../schema/auth";
import { getCookie } from "hono/cookie";
import { headers } from "next/headers";

export const authApp = new Hono()
  .post("/sign-in/email", zValidator("json", signinSchema), async (c) => {
    const body = c.req.valid("json");
    const res = await auth.api.signInEmail({
      body,
      returnHeaders: true,
      asResponse: true,
    });
    return res;
  })
  .post("/sign-up/email", zValidator("json", signupSchema), async (c) => {
    const body = c.req.valid("json");
    const res = await auth.api.signUpEmail({
      body,
      returnHeaders: true,
      asResponse: true,
    });

    const headers = new Headers(res.headers);
    const cookie = `pending-email=${encodeURIComponent(body.email)}; Path=/; Max-Age=${60 * 10}; HttpOnly; SameSite=Lax; Secure`;
    headers.append("set-Cookie", cookie);

    return new Response(res.body, { status: res.status, headers });
  })
  .post("/send-verification-email", async (c) => {
    const email = getCookie(c, "pending-email") as string;
    const res = await auth.api.sendVerificationEmail({
      body: {
        email,
        callbackURL: "/",
      },
    });
    return c.json({ status: res.status });
  })
  .post("/sign-in/social", async (c) => {
    const body = await c.req.json();
    const res = await auth.api.signInSocial({
      body,
      asResponse: true,
    });

    return res;
  })
  .post("/sigin-out", async (c) => {
    await auth.api.signOut({ headers: await headers() });

    return c.status(200);
  })
  .on(["GET", "POST"], "/*", (c) => auth.handler(c.req.raw));
