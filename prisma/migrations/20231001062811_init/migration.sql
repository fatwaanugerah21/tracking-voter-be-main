/*
  Warnings:

  - The values [COORDINATOR] on the enum `User_role` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `role` ENUM('OWNER', 'ADMIN', 'TPS_COORDINATOR', 'TPS_PR') NOT NULL;
