import { auth } from "@/lib/auth";
import { mustAuth } from "@/middleware/mustAuht";
import { Hono } from "hono";
import { showRoutes } from "hono/dev";
import { HTTPException } from "hono/http-exception";
import { handle } from "hono/vercel";

const app = new Hono()
  .basePath("/api")
  .on(["GET", "POST"], "/auth/**", (c) => auth.handler(c.req.raw))
  .get("/me", mustAuth, async (c) => {
    const user = c.get("user");
    return c.json({ data: user });
  })

  .onError((err, c) => {
    console.error(err);
    if (err instanceof HTTPException) {
      return c.json({ error: err.message }, err.status);
    }
    return c.json({ error: "Internal server error" }, 500);
  });

showRoutes(app);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type appType = typeof app;
