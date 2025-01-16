/*
  Warnings:

  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Booking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BookingTimeline` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Company` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Garage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Manager` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Slot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Valet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ValetAssignment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Verification` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_garageId_fkey";

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_slotId_fkey";

-- DropForeignKey
ALTER TABLE "BookingTimeline" DROP CONSTRAINT "BookingTimeline_bookingId_fkey";

-- DropForeignKey
ALTER TABLE "BookingTimeline" DROP CONSTRAINT "BookingTimeline_managerId_fkey";

-- DropForeignKey
ALTER TABLE "BookingTimeline" DROP CONSTRAINT "BookingTimeline_valetId_fkey";

-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_uid_fkey";

-- DropForeignKey
ALTER TABLE "Garage" DROP CONSTRAINT "Garage_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Manager" DROP CONSTRAINT "Manager_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Manager" DROP CONSTRAINT "Manager_uid_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_garageId_fkey";

-- DropForeignKey
ALTER TABLE "Slot" DROP CONSTRAINT "Slot_garageId_fkey";

-- DropForeignKey
ALTER TABLE "Valet" DROP CONSTRAINT "Valet_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Valet" DROP CONSTRAINT "Valet_uid_fkey";

-- DropForeignKey
ALTER TABLE "ValetAssignment" DROP CONSTRAINT "ValetAssignment_bookingId_fkey";

-- DropForeignKey
ALTER TABLE "ValetAssignment" DROP CONSTRAINT "ValetAssignment_pickupValetId_fkey";

-- DropForeignKey
ALTER TABLE "ValetAssignment" DROP CONSTRAINT "ValetAssignment_returnValetId_fkey";

-- DropForeignKey
ALTER TABLE "Verification" DROP CONSTRAINT "Verification_adminId_fkey";

-- DropForeignKey
ALTER TABLE "Verification" DROP CONSTRAINT "Verification_garageId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "image";

-- DropTable
DROP TABLE "Address";

-- DropTable
DROP TABLE "Booking";

-- DropTable
DROP TABLE "BookingTimeline";

-- DropTable
DROP TABLE "Company";

-- DropTable
DROP TABLE "Customer";

-- DropTable
DROP TABLE "Garage";

-- DropTable
DROP TABLE "Manager";

-- DropTable
DROP TABLE "Review";

-- DropTable
DROP TABLE "Slot";

-- DropTable
DROP TABLE "Valet";

-- DropTable
DROP TABLE "ValetAssignment";

-- DropTable
DROP TABLE "Verification";

-- DropEnum
DROP TYPE "BookingStatus";

-- DropEnum
DROP TYPE "SlotType";
