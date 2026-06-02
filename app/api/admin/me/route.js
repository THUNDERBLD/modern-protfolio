import { NextResponse } from "next/server";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const token = request.cookies.get(ADMIN_COOKIE)?.value;

  if (!verifySessionToken(token)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  return NextResponse.json({ ok: true, adminId: process.env.ADMIN_ID });
}
