/*
  Warnings:

  - A unique constraint covering the columns `[nik]` on the table `Elector` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `Elector` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Elector` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Elector` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nik` to the `Elector` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Elector` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Elector` table without a default value. This is not possible if the table is not empty.
  - Added the required column `votingPlaceId` to the `Elector` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Elector` ADD COLUMN `address` VARCHAR(191) NOT NULL,
    ADD COLUMN `bribeAmt` INTEGER NULL,
    ADD COLUMN `choiceName` VARCHAR(191) NULL,
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `nik` VARCHAR(191) NOT NULL,
    ADD COLUMN `phoneNumber` VARCHAR(191) NOT NULL,
    ADD COLUMN `status` ENUM('WILLINGLY', 'NEED_MONEY', 'NOT_GONNA_VOTE') NOT NULL,
    ADD COLUMN `votingPlaceId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Elector_nik_key` ON `Elector`(`nik`);

-- AddForeignKey
ALTER TABLE `Elector` ADD CONSTRAINT `Elector_votingPlaceId_fkey` FOREIGN KEY (`votingPlaceId`) REFERENCES `VotingPlace`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
