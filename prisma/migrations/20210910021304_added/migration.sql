-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_igdbGameId_fkey";

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_igdbGameId_fkey" FOREIGN KEY ("igdbGameId") REFERENCES "igdbGame"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "Game.igdbGameId_parentListId_unique" RENAME TO "Game_igdbGameId_parentListId_key";

-- RenameIndex
ALTER INDEX "GameList.listName_authorId_unique" RENAME TO "GameList_listName_authorId_key";

-- RenameIndex
ALTER INDEX "Session.sid_unique" RENAME TO "Session_sid_key";

-- RenameIndex
ALTER INDEX "ToDoList.toDoListName_parentGameId_unique" RENAME TO "ToDoList_toDoListName_parentGameId_key";

-- RenameIndex
ALTER INDEX "User.email_unique" RENAME TO "User_email_key";

-- RenameIndex
ALTER INDEX "User.username_unique" RENAME TO "User_username_key";

-- RenameIndex
ALTER INDEX "igdbGame.id_unique" RENAME TO "igdbGame_id_key";

-- RenameIndex
ALTER INDEX "igdbGame.name_index" RENAME TO "igdbGame_name_idx";
