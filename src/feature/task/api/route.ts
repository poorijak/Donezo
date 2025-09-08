import { db } from "@/lib/db";
import { mustAuth } from "@/middleware/mustAuht";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { taskSchema } from "../schema/task";
import z from "zod";
import { status } from "@prisma/client";
import { error } from "console";

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
  })
  .patch(
    "/udpate-status-taks",
    zValidator(
      "json",
      z.object({
        id: z.string(),
        status: z.enum(status),
      })
    ),
    async (c) => {
      const { id, status } = c.req.valid("json");

      const task = await db.todo.findUnique({
        where: { id },
      });

      if (!task) {
        return c.json({ error: "Task not found" }, 404);
      }

      const result = await db.todo.update({
        where: { id },
        data: {
          status,
        },
      });

      return c.json(result);
    }
  )
  .get("/get-task-all", async (c) => {
    const data = await db.todo.findMany({
      orderBy: { createdAt: "asc" },
    });

    const todo = data.map(({ id, title, note, start, end, status }) => ({
      id,
      title,
      note,
      start,
      end,
      status,
    }));

    return c.json(todo);
  });
