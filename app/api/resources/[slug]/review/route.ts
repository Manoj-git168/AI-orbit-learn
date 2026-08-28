import { NextRequest, NextResponse } from "next/server";
import { addReviewToResource } from "@/lib/resourceService";

interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

export async function POST(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { slug } = await params;
    const body = await request.json();

    if (!body.author || !body.comment) {
      return NextResponse.json(
        { success: false, message: "Author and comment are required." },
        { status: 400 }
      );
    }

    const ok = await addReviewToResource(slug, {
      author: body.author,
      role: body.role || "AI Practitioner",
      rating: Number(body.rating) || 5,
      comment: body.comment,
    });

    return NextResponse.json({
      success: ok,
    });
  } catch (error) {
    console.error("API POST review error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to add review" },
      { status: 500 }
    );
  }
}
