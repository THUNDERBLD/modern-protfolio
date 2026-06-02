import { NextResponse } from "next/server";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/auth";
import { getAdminContent, saveContent } from "@/lib/contentStore";

export const dynamic = "force-dynamic";

const requireAdmin = (request) => {
  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  return verifySessionToken(token);
};

export async function GET(request) {
  if (!requireAdmin(request)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const content = await getAdminContent();
    return NextResponse.json({ content });
  } catch (error) {
    console.error("[Admin GET] Failed to load content:", error);
    return NextResponse.json(
      { message: error.message || "Failed to load content." },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  if (!requireAdmin(request)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const saved = await saveContent(body.content || body);
    return NextResponse.json({ content: saved });
  } catch (error) {
    console.error("[Admin PUT] Failed to save content:", error);
    return NextResponse.json(
      { message: error.message || "Failed to save content." },
      { status: 500 }
    );
  }
}
