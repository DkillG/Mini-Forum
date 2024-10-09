/*
  Warnings:

  - A unique constraint covering the columns `[slugId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Post_slugId_key" ON "Post"("slugId");
