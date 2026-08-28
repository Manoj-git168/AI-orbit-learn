import { NextRequest, NextResponse } from "next/server";
import { getAllResources, createResource } from "@/lib/resourceService";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search")?.trim() || undefined;
    const type = searchParams.get("type") || undefined;
    const category = searchParams.get("category") || undefined;
    const level = searchParams.get("level") || undefined;
    const price = searchParams.get("price") || undefined;
    const sort = (searchParams.get("sort") as any) || undefined;
    const featuredParam = searchParams.get("featured");
    const featured = featuredParam === "true" ? true : featuredParam === "false" ? false : undefined;

    const resources = await getAllResources({
      search,
      type,
      category,
      level,
      price,
      featured,
      sort,
    });

    return NextResponse.json({
      success: true,
      count: resources.length,
      data: resources,
    });
  } catch (error) {
    console.error("API GET resources error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch resources" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.title || !body.websiteUrl) {
      return NextResponse.json(
        { success: false, message: "Title and websiteUrl are required." },
        { status: 400 }
      );
    }

    const created = await createResource(body);

    return NextResponse.json({
      success: true,
      data: created,
    });
  } catch (error) {
    console.error("API POST resource error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create resource" },
      { status: 500 }
    );
  }
}
