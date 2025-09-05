import { db } from "@/lib/db";
import { mustAuth } from "@/middleware/mustAuht";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { taskSchema } from "../schema/task";
import z from "zod";

export const TaskApp = new Hono()
  .get("get-tag", async (c) => {
    const data = await db.tag.findMany({ orderBy: { createAt: "asc" } });

    const tag = data.map(({ id, icon, title, slug, color }) => ({
      id,
      icon,
      title,
      slug,
      color,
    }));
    return c.json(tag);
  })
  .post("/create-task", zValidator("json", taskSchema), mustAuth, async (c) => {
    const body = c.req.valid("json");
    const user = c.get("user");

    const { title, note, tag, duration } = body as {
      title: string;
      note?: string;
      tag: string[];
      duration?: { start?: Date; end?: Date };
    };

    const paredBody = {
      ...body,
      duration: {
        start: duration?.start ? new Date(duration.start) : undefined,
        end: duration?.end ? new Date(duration.end) : undefined,
      },
    };


    if (!user?.id) {
      throw new Error("Unauthorized");
    }

    const result = await db.$transaction(async (prisma) => {
      const todo = await prisma.todo.create({
        data: {
          title,
          note: note,
          ...(paredBody.duration && {
            start: paredBody.duration.start,
            end: paredBody.duration.end,
          }),
          userId: user.id,
        },
      });

      if (tag.length > 0) {
        await Promise.all(
          tag.map((tagItem) => {
            return prisma.todoTag.createMany({
              data: {
                tagId: tagItem,
                todoId: todo.id,
              },
            });
          })
        );
      }
      return todo;
    });

    return c.json(result);
  });
