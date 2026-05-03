/*
  Warnings:

  - Added the required column `creatorId` to the `ExerciseLibrary` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ExerciseLibrary" DROP CONSTRAINT "ExerciseLibrary_accountId_fkey";

-- DropForeignKey
ALTER TABLE "RoutineTemplate" DROP CONSTRAINT "RoutineTemplate_accountId_fkey";

-- AlterTable
ALTER TABLE "ExerciseLibrary" ADD COLUMN     "creatorId" TEXT NOT NULL,
ADD COLUMN     "equipment" TEXT,
ADD COLUMN     "isGlobal" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "muscleGroup" TEXT,
ADD COLUMN     "videoUrl" TEXT,
ALTER COLUMN "accountId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "RoutineTemplate" ADD COLUMN     "isGlobal" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "accountId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "ToolTemplate" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "toolKey" "ToolKey" NOT NULL,
    "isGlobal" BOOLEAN NOT NULL DEFAULT false,
    "accountId" TEXT,
    "creatorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ToolTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ToolTemplateExercise" (
    "id" TEXT NOT NULL,
    "toolTemplateId" TEXT NOT NULL,
    "exerciseId" TEXT,
    "customExerciseName" TEXT,
    "order" INTEGER NOT NULL,
    "sets" INTEGER,
    "reps" INTEGER,
    "duration" INTEGER,
    "rest" INTEGER,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ToolTemplateExercise_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ToolTemplate_accountId_idx" ON "ToolTemplate"("accountId");

-- CreateIndex
CREATE INDEX "ToolTemplate_toolKey_idx" ON "ToolTemplate"("toolKey");

-- CreateIndex
CREATE INDEX "ToolTemplate_isGlobal_idx" ON "ToolTemplate"("isGlobal");

-- CreateIndex
CREATE INDEX "ToolTemplateExercise_toolTemplateId_idx" ON "ToolTemplateExercise"("toolTemplateId");

-- CreateIndex
CREATE INDEX "ToolTemplateExercise_exerciseId_idx" ON "ToolTemplateExercise"("exerciseId");

-- CreateIndex
CREATE INDEX "ExerciseLibrary_isGlobal_idx" ON "ExerciseLibrary"("isGlobal");

-- CreateIndex
CREATE INDEX "RoutineTemplate_isGlobal_idx" ON "RoutineTemplate"("isGlobal");

-- AddForeignKey
ALTER TABLE "RoutineTemplate" ADD CONSTRAINT "RoutineTemplate_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseLibrary" ADD CONSTRAINT "ExerciseLibrary_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseLibrary" ADD CONSTRAINT "ExerciseLibrary_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToolTemplate" ADD CONSTRAINT "ToolTemplate_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToolTemplate" ADD CONSTRAINT "ToolTemplate_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToolTemplateExercise" ADD CONSTRAINT "ToolTemplateExercise_toolTemplateId_fkey" FOREIGN KEY ("toolTemplateId") REFERENCES "ToolTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToolTemplateExercise" ADD CONSTRAINT "ToolTemplateExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "ExerciseLibrary"("id") ON DELETE SET NULL ON UPDATE CASCADE;
