-- AlterTable
ALTER TABLE "ToDoItem" ALTER COLUMN "listPosition" DROP DEFAULT;
DROP SEQUENCE "ToDoItem_listPosition_seq";
