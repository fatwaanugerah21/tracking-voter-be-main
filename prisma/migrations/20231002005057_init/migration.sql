/*
  Warnings:

  - You are about to drop the `VotingPlacePr` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `VotingPlacePr` DROP FOREIGN KEY `VotingPlacePr_coordinatorId_fkey`;

-- DropForeignKey
ALTER TABLE `VotingPlacePr` DROP FOREIGN KEY `VotingPlacePr_userId_fkey`;

-- DropForeignKey
ALTER TABLE `VotingPlacePr` DROP FOREIGN KEY `VotingPlacePr_votingPlaceId_fkey`;

-- DropTable
DROP TABLE `VotingPlacePr`;

-- CreateTable
CREATE TABLE `VPPR` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `coordinatorId` INTEGER NOT NULL,
    `votingPlaceId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `VPPR` ADD CONSTRAINT `VPPR_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VPPR` ADD CONSTRAINT `VPPR_coordinatorId_fkey` FOREIGN KEY (`coordinatorId`) REFERENCES `Coordinator`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VPPR` ADD CONSTRAINT `VPPR_votingPlaceId_fkey` FOREIGN KEY (`votingPlaceId`) REFERENCES `VotingPlace`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
