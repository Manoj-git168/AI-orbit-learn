import { prisma } from "@/lib/prisma";
import { resources as staticResources } from "@/data/resources";
import type {
  LearningResource,
  ResourceLevel,
  ResourcePrice,
  ResourceType,
  ResourceReview,
} from "@/types/resources";

// In-memory store for newly submitted resources or runtime updates if DB is unavailable
let memoryResources: LearningResource[] = [...staticResources];

export interface ResourceFilters {
  search?: string;
  type?: string;
  category?: string;
  level?: string;
  price?: string;
  featured?: boolean;
  sort?: "popular" | "rating" | "newest" | "duration";
}

export async function getAllResources(
  filters: ResourceFilters = {}
): Promise<LearningResource[]> {
  try {
    const where: any = {};

    if (filters.search) {
      where.OR = [
        { title: { contains: filters.search, mode: "insensitive" } },
        { description: { contains: filters.search, mode: "insensitive" } },
        { category: { contains: filters.search, mode: "insensitive" } },
        { provider: { contains: filters.search, mode: "insensitive" } },
        { author: { contains: filters.search, mode: "insensitive" } },
      ];
    }

    if (filters.type && filters.type !== "All") {
      where.type = filters.type;
    }

    if (filters.category && filters.category !== "All") {
      where.category = filters.category;
    }

    if (filters.level && filters.level !== "All") {
      where.level = filters.level;
    }

    if (filters.price && filters.price !== "All") {
      where.price = filters.price;
    }

    if (typeof filters.featured === "boolean") {
      where.featured = filters.featured;
    }

    const dbPromise = prisma.resource.findMany({
      where,
      orderBy:
        filters.sort === "rating"
          ? { rating: "desc" }
          : filters.sort === "newest"
          ? { createdAt: "desc" }
          : { reviewCount: "desc" },
    });

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("DB Timeout")), 1200)
    );

    const dbResults = await Promise.race([dbPromise, timeoutPromise]);

    if (dbResults && dbResults.length > 0) {
      // Merge with memory curriculum / reviews for richer details
      return dbResults.map((item) => {
        const match = memoryResources.find((m) => m.slug === item.slug);
        return {
          ...(item as unknown as LearningResource),
          curriculum: match?.curriculum || [],
          reviews: match?.reviews || [],
          prerequisites: match?.prerequisites || [],
          targetAudience: match?.targetAudience || [],
        };
      });
    }
  } catch {
    // DB not reachable or timed out, gracefully fall back to memory
  }

  // Fallback memory filtering
  let results = [...memoryResources];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    results = results.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.provider.toLowerCase().includes(q) ||
        r.author.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  if (filters.type && filters.type !== "All") {
    results = results.filter((r) => r.type === filters.type);
  }

  if (filters.category && filters.category !== "All") {
    results = results.filter((r) => r.category === filters.category);
  }

  if (filters.level && filters.level !== "All") {
    results = results.filter((r) => r.level === filters.level);
  }

  if (filters.price && filters.price !== "All") {
    results = results.filter((r) => r.price === filters.price);
  }

  if (typeof filters.featured === "boolean") {
    results = results.filter((r) => r.featured === filters.featured);
  }

  if (filters.sort === "rating") {
    results.sort((a, b) => b.rating - a.rating);
  } else if (filters.sort === "newest") {
    results.sort((a, b) => Number(b.id) - Number(a.id));
  } else {
    results.sort((a, b) => b.reviewCount - a.reviewCount);
  }

  return results;
}

export async function getResourceBySlug(
  slug: string
): Promise<LearningResource | null> {
  try {
    const dbPromise = prisma.resource.findUnique({
      where: { slug },
    });

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("DB Timeout")), 1200)
    );

    const resource = await Promise.race([dbPromise, timeoutPromise]);
    if (resource) {
      const match = memoryResources.find((r) => r.slug === slug);
      return {
        ...(resource as unknown as LearningResource),
        curriculum: match?.curriculum || [],
        reviews: match?.reviews || [],
        prerequisites: match?.prerequisites || [],
        targetAudience: match?.targetAudience || [],
      };
    }
  } catch {
    // DB not reachable, fall back to memory
  }

  const found = memoryResources.find((r) => r.slug === slug);
  return found || null;
}

export async function getRelatedResources(
  resource: LearningResource,
  limit = 3
): Promise<LearningResource[]> {
  try {
    const dbPromise = prisma.resource.findMany({
      where: {
        AND: [
          { id: { not: resource.id } },
          {
            OR: [
              { category: resource.category },
              { tags: { hasSome: resource.tags } },
            ],
          },
        ],
      },
      take: limit,
      orderBy: { rating: "desc" },
    });

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("DB Timeout")), 1200)
    );

    const related = await Promise.race([dbPromise, timeoutPromise]);
    if (related && related.length > 0) {
      return related as unknown as LearningResource[];
    }
  } catch {
    // Fall back to memory
  }

  return memoryResources
    .filter(
      (r) =>
        r.id !== resource.id &&
        (r.category === resource.category ||
          r.tags.some((t) => resource.tags.includes(t)))
    )
    .slice(0, limit);
}

export async function createResource(
  data: Omit<LearningResource, "id">
): Promise<LearningResource> {
  const newId = String(Date.now());
  const newResource: LearningResource = {
    ...data,
    id: newId,
    reviewCount: data.reviewCount || 0,
    rating: data.rating || 5.0,
    featured: data.featured || false,
    thumbnail: data.thumbnail || "/resources/ai-engineering.jpg",
    curriculum: data.curriculum || [],
    reviews: data.reviews || [],
    tags: data.tags && data.tags.length > 0 ? data.tags : [data.category],
  };

  try {
    await prisma.resource.create({
      data: {
        id: newResource.id,
        slug: newResource.slug,
        title: newResource.title,
        description: newResource.description,
        overview: newResource.overview,
        learningOutcomes: newResource.learningOutcomes,
        type: newResource.type as any,
        category: newResource.category,
        tags: newResource.tags,
        provider: newResource.provider,
        author: newResource.author,
        level: newResource.level as any,
        duration: newResource.duration,
        format: newResource.format,
        price: newResource.price as any,
        rating: newResource.rating,
        reviewCount: newResource.reviewCount,
        thumbnail: newResource.thumbnail,
        websiteUrl: newResource.websiteUrl,
        featured: newResource.featured,
      },
    });
  } catch (error) {
    console.warn("Prisma write fallback to in-memory:", error);
  }

  memoryResources = [newResource, ...memoryResources];
  return newResource;
}

export async function addReviewToResource(
  slug: string,
  review: Omit<ResourceReview, "id" | "date">
): Promise<boolean> {
  const target = memoryResources.find((r) => r.slug === slug);
  if (!target) return false;

  const newReview: ResourceReview = {
    ...review,
    id: "rev-" + Date.now(),
    date: new Date().toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    }),
  };

  if (!target.reviews) {
    target.reviews = [];
  }
  target.reviews.unshift(newReview);
  target.reviewCount += 1;
  const total = target.reviews.reduce(
    (acc, curr) => acc + curr.rating,
    target.rating * 5
  );
  target.rating = Number((total / (target.reviews.length + 5)).toFixed(1));

  return true;
}
