import { auth } from "@/lib/auth";
import { authType } from "@/types/auth";
import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";

export const mustAuth = createMiddleware<{
  Variables: {
    user: ReturnType<authType>["user"];
  };
}>(async (c, next) => {
  try {
    const session = await auth.api.getSession({
      headers: c.req.raw.headers,
    });

    if (!session) {
      throw new HTTPException(401, { message: "Unauthorized" });
    }

    c.set("user", session.user);
    await next();
  } catch (err) {
    console.error("🔥 getSession error:", err);
    console.log("🔍 Headers:", Object.fromEntries(c.req.raw.headers.entries()));
    throw new HTTPException(500, {
      message: "Failed to get session",
    });
  }
});
