import { db } from "@/lib/db";
import { mustAuth } from "@/middleware/mustAuht";
import { Hono } from "hono";

export const userApp = new Hono().get("/get-user", mustAuth, async (c) => {
  const user = c.get("user");
  const data = await db.user.findUnique({
    where: { id: user?.id },
  });

  return c.json(data);
});
