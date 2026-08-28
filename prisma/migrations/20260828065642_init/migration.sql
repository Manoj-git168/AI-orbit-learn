-- CreateEnum
CREATE TYPE "ResourceType" AS ENUM ('Course', 'Guide', 'Ebook', 'Tutorial');

-- CreateEnum
CREATE TYPE "ResourceLevel" AS ENUM ('Beginner', 'Intermediate', 'Advanced');

-- CreateEnum
CREATE TYPE "ResourcePrice" AS ENUM ('Free', 'Paid');

-- CreateTable
CREATE TABLE "Resource" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "learningOutcomes" TEXT[],
    "type" "ResourceType" NOT NULL,
    "category" TEXT NOT NULL,
    "tags" TEXT[],
    "provider" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "level" "ResourceLevel" NOT NULL,
    "duration" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "price" "ResourcePrice" NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "reviewCount" INTEGER NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "websiteUrl" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Resource_slug_key" ON "Resource"("slug");
