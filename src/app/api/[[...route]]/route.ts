import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { handle } from "hono/vercel";
import { authApp } from "@/feature/auth/api/route";
import { userApp } from "@/feature/user/api/route";
import { TaskApp } from "@/feature/task/api/route";

const app = new Hono()
  .basePath("/api")
  .onError((err, c) => {
    console.error(err);
    if (err instanceof HTTPException) {
      return c.json({ error: err.message }, err.status);
    }
    return c.json({ error: "Internal server error" }, 500);
  })

  .route("/auth", authApp)
  .route("/user", userApp)
  .route("/task", TaskApp);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type appType = typeof app;
