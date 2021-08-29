-- CreateTable
CREATE TABLE "ToDoList" (
    "id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "parentGameId" TEXT NOT NULL,
    "toDoListName" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ToDoItem" (
    "id" TEXT NOT NULL,
    "parentToDoListId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "taskText" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ToDoList.toDoListName_parentGameId_unique" ON "ToDoList"("toDoListName", "parentGameId");

-- AddForeignKey
ALTER TABLE "ToDoList" ADD FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToDoList" ADD FOREIGN KEY ("parentGameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToDoItem" ADD FOREIGN KEY ("parentToDoListId") REFERENCES "ToDoList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToDoItem" ADD FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
