-- CreateTable
CREATE TABLE `VotingPlacePr` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `coordinatorId` INTEGER NOT NULL,
    `votingPlaceId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `VotingPlacePr` ADD CONSTRAINT `VotingPlacePr_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VotingPlacePr` ADD CONSTRAINT `VotingPlacePr_votingPlaceId_fkey` FOREIGN KEY (`votingPlaceId`) REFERENCES `VotingPlace`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
