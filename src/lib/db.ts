// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const db = globalForPrisma.prisma || new PrismaClient(); //  ส่ง prisma ที่เก็บ prismaClient ออกไปไว้เรียกใช้กับ db

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
