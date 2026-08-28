import "dotenv/config";

import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

import { resources } from "../data/resources";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined in .env");
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("Starting database seed...");

  for (const resource of resources) {
    await prisma.resource.upsert({
      where: {
        slug: resource.slug,
      },
      update: {
        title: resource.title,
        description: resource.description,
        overview: resource.overview,
        learningOutcomes: resource.learningOutcomes,
        type: resource.type,
        category: resource.category,
        tags: resource.tags,
        provider: resource.provider,
        author: resource.author,
        level: resource.level,
        duration: resource.duration,
        format: resource.format,
        price: resource.price,
        rating: resource.rating,
        reviewCount: resource.reviewCount,
        thumbnail: resource.thumbnail,
        websiteUrl: resource.websiteUrl,
        featured: resource.featured,
      },
      create: {
        id: resource.id,
        slug: resource.slug,
        title: resource.title,
        description: resource.description,
        overview: resource.overview,
        learningOutcomes: resource.learningOutcomes,
        type: resource.type,
        category: resource.category,
        tags: resource.tags,
        provider: resource.provider,
        author: resource.author,
        level: resource.level,
        duration: resource.duration,
        format: resource.format,
        price: resource.price,
        rating: resource.rating,
        reviewCount: resource.reviewCount,
        thumbnail: resource.thumbnail,
        websiteUrl: resource.websiteUrl,
        featured: resource.featured,
      },
    });

    console.log(`✓ Seeded: ${resource.title}`);
  }

  console.log(`\nSuccessfully seeded ${resources.length} resources.`);
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });