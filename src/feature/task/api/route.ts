import { db } from "@/lib/db";
import { Hono } from "hono";

export const TaskApp = new Hono().get("get-tag", async (c) => {
  const data = await db.tag.findMany({ orderBy: { createAt: "asc" } });

  const tag = data.map(({ id, icon, title, slug, color }) => ({
    id,
    icon,
    title,
    slug,
    color,
  }));

  return c.json(tag);
});
