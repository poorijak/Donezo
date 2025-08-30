/*
  Warnings:

  - Added the required column `icon` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Tag" ADD COLUMN     "icon" TEXT NOT NULL;
