export type ResourceType =
  | "Course"
  | "Guide"
  | "Ebook"
  | "Tutorial"
  | "Roadmap";

export type ResourceLevel =
  | "Beginner"
  | "Intermediate"
  | "Advanced";

export type ResourcePrice =
  | "Free"
  | "Paid";

export interface CurriculumLesson {
  title: string;
  duration?: string;
  type?: "video" | "article" | "exercise" | "project";
}

export interface CurriculumModule {
  title: string;
  duration?: string;
  lessons: CurriculumLesson[];
}

export interface ResourceReview {
  id: string;
  author: string;
  role?: string;
  rating: number;
  date: string;
  comment: string;
}

export interface LearningResource {
  id: string;
  slug: string;
  title: string;
  description: string;
  overview: string;
  learningOutcomes: string[];
  type: ResourceType;
  category: string;
  tags: string[];
  provider: string;
  author: string;
  authorBio?: string;
  level: ResourceLevel;
  duration: string;
  format: string;
  price: ResourcePrice;
  rating: number;
  reviewCount: number;
  thumbnail: string;
  websiteUrl: string;
  featured: boolean;
  language?: string;
  prerequisites?: string[];
  targetAudience?: string[];
  curriculum?: CurriculumModule[];
  reviews?: ResourceReview[];
}

export interface LearningRoadmap {
  id: string;
  slug: string;
  title: string;
  description: string;
  level: ResourceLevel;
  estimatedDuration: string;
  category: string;
  milestones: {
    step: number;
    title: string;
    description: string;
    skills: string[];
    recommendedResourceSlugs?: string[];
  }[];
}