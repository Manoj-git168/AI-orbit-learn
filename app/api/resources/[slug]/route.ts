import { NextRequest, NextResponse } from "next/server";
import { getResourceBySlug, getRelatedResources } from "@/lib/resourceService";

interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { slug } = await params;
    const resource = await getResourceBySlug(slug);

    if (!resource) {
      return NextResponse.json(
        { success: false, message: "Resource not found" },
        { status: 404 }
      );
    }

    const related = await getRelatedResources(resource, 3);

    return NextResponse.json({
      success: true,
      data: {
        ...resource,
        related,
      },
    });
  } catch (error) {
    console.error("API GET resource slug error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch resource" },
      { status: 500 }
    );
  }
}
