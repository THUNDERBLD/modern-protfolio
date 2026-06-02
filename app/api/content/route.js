import { NextResponse } from "next/server";
import { getContent } from "@/lib/contentStore";

export const dynamic = "force-dynamic";

export async function GET() {
  const content = await getContent();
  return NextResponse.json({ content });
}
