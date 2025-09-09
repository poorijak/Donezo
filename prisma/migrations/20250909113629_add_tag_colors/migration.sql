/*
  Warnings:

  - You are about to drop the column `color` on the `Tag` table. All the data in the column will be lost.
  - Added the required column `bgColor` to the `Tag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `textColor` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Tag" DROP COLUMN "color",
ADD COLUMN     "bgColor" TEXT NOT NULL,
ADD COLUMN     "textColor" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Todo" ALTER COLUMN "note" DROP NOT NULL,
ALTER COLUMN "start" DROP NOT NULL,
ALTER COLUMN "end" DROP NOT NULL;
