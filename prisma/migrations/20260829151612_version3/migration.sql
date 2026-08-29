/*
  Warnings:

  - A unique constraint covering the columns `[sessionId]` on the table `RefreshSession` will be added. If there are existing duplicate values, this will fail.
  - The required column `sessionId` was added to the `RefreshSession` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "RefreshSession" ADD COLUMN     "sessionId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "RefreshSession_sessionId_key" ON "RefreshSession"("sessionId");
