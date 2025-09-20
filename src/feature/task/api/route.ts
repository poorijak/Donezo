import { db } from "@/lib/db";
import { mustAuth } from "@/middleware/mustAuht";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { taskSchema } from "../schema/task";
import z from "zod";
import { status } from "@prisma/client";

export const TaskApp = new Hono()
  .get("/get-tag", async (c) => {
    try {
      const data = await db.tag.findMany({ orderBy: { createAt: "asc" } });
      const tag = data.map(({ id, icon, title, slug, textColor, bgColor }) => ({
        id,
        icon,
        title,
        slug,
        textColor,
        bgColor,
      }));
      return c.json(tag);
      // eslint-disable-next-line
    } catch (e: any) {
      console.error("[GET TAG ERROR]", e?.message ?? e);
      return c.json({ error: "failed to fetch tags" }, 500);
    }
  })

  .get("/get-task-all", mustAuth, async (c) => {
    const user = c.get("user");

    const today = new Date();

    if (!user) {
      throw new Error("Unauthorized");
    }

    const data = await db.todo.findMany({
      where: { userId: user.id },
      include: {
        TodoTag: {
          include: {
            tag: {
              select: {
                id: true,
                icon: true,
                title: true,
                slug: true,
                textColor: true,
                bgColor: true,
              },
            },
          },
        },
      },
    });

    const sorted = data.sort((a, b) => {
      if (!a.end) return 1;
      if (!b.end) return -1;
      return (
        Math.abs(new Date(a.end).getTime() - today.getTime()) -
        Math.abs(new Date(b.end).getTime() - today.getTime())
      );
    });

    const todo = sorted.map(
      ({ id, title, note, start, end, status, TodoTag }) => ({
        id,
        title,
        note,
        start,
        end,
        status,
        tags: TodoTag.map((tt) => tt.tag),
      }),
    );

    return c.json(todo);
  })
  .get("/get-task", mustAuth, async (c) => {
    const status = c.req.query("status") as status;
    const user = c.get("user");

    const today = new Date();

    console.log(status);

    if (!user) {
      throw new Error("Unauthorized");
    }

    const data = await db.todo.findMany({
      where: {
        userId: user.id,
        ...(status && status !== null ? { status: status as status } : {}),
      },
      include: {
        TodoTag: {
          include: {
            tag: {
              select: {
                id: true,
                icon: true,
                title: true,
                slug: true,
                textColor: true,
                bgColor: true,
              },
            },
          },
        },
      },
    });

    const sorted = data.sort((a, b) => {
      if (!a.end) return 1;
      if (!b.end) return -1;
      return (
        Math.abs(new Date(a.end).getTime() - today.getTime()) -
        Math.abs(new Date(b.end).getTime() - today.getTime())
      );
    });

    const todo = sorted.map(
      ({ id, title, note, start, end, status, TodoTag }) => ({
        id,
        title,
        note,
        start,
        end,
        status,
        tags: TodoTag.map((tt) => tt.tag),
      }),
    );

    return c.json(todo);
  })
  .post("/create-task", zValidator("json", taskSchema), mustAuth, async (c) => {
    const body = c.req.valid("json");
    const user = c.get("user");

    const { title, note, tag, duration, status } = body;

    if (!user?.id) {
      throw new Error("Unauthorized");
    }

    const result = await db.$transaction(async (prisma) => {
      const todo = await prisma.todo.create({
        data: {
          title,
          note: note,
          start: duration?.start,
          end: duration?.end,
          userId: user.id,
          status,
        },
      });

      if (tag && tag.length > 0) {
        await Promise.all(
          tag.map((tagItem) => {
            return prisma.todoTag.createMany({
              data: {
                tagId: tagItem,
                todoId: todo.id,
              },
            });
          }),
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
      }),
    ),
    mustAuth,
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
    },
  )
  .patch(
    "/update-task",
    zValidator("json", taskSchema),
    mustAuth,
    async (c) => {
      const body = c.req.valid("json");
      const user = c.get("user");

      const { taskId, title, tag, note, duration, status } = body as {
        taskId: string;
        title: string;
        note: string | undefined;
        tag: string[];
        duration?: { start?: Date; end?: Date };
        status?: status;
      };

      const todo = await db.todo.findUnique({ where: { id: taskId } });

      if (!todo) {
        throw new Error("Not found this task");
      }

      if (!user || user.id !== todo.userId) {
        throw new Error("Unauthorized");
      }

      const results = await db.$transaction(async (prisma) => {
        const todo = await prisma.todo.update({
          where: {
            id: taskId,
          },
          data: {
            title,
            note,
            start: duration?.start,
            end: duration?.end,
            status,
          },
        });

        await prisma.todoTag.deleteMany({
          where: {
            todoId: taskId,
          },
        });

        if (tag && tag.length > 0) {
          await prisma.todoTag.createMany({
            data: tag.map((tagId) => ({ todoId: taskId, tagId })),
          });
        }

        return todo;
      });

      return c.json(results);
    },
  )
  .delete("/delete-task", mustAuth, async (c) => {
    const taskId: string = await c.req.json();
    const user = c.get("user");

    const todo = await db.todo.findUnique({ where: { id: taskId } });

    if (!todo) {
      throw new Error("Not found this task");
    }

    if (!user || user.id !== todo.userId) {
      throw new Error("Unauthorized");
    }

    await db.todoTag.deleteMany({
      where: { todoId: taskId },
    });

    const res = await db.todo.delete({
      where: { id: taskId },
    });

    return c.json(res);
  });
