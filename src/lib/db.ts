// lib/db.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    __internal: {
      engine: {
        statementCacheSize: 0,
      },
    },
  } as any);

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
