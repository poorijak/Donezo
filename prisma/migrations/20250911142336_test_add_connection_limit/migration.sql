-- DropForeignKey
ALTER TABLE "public"."TodoTag" DROP CONSTRAINT "TodoTag_tagId_fkey";

-- DropForeignKey
ALTER TABLE "public"."TodoTag" DROP CONSTRAINT "TodoTag_todoId_fkey";

-- AddForeignKey
ALTER TABLE "public"."TodoTag" ADD CONSTRAINT "TodoTag_todoId_fkey" FOREIGN KEY ("todoId") REFERENCES "public"."Todo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TodoTag" ADD CONSTRAINT "TodoTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "public"."Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
