import { NextResponse } from "next/server";
import { roadmaps } from "@/data/roadmaps";

export async function GET() {
  return NextResponse.json({
    success: true,
    count: roadmaps.length,
    data: roadmaps,
  });
}
