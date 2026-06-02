import { NextResponse } from "next/server";
import { ADMIN_COOKIE, createSessionToken, sessionCookieOptions, verifyAdminCredentials } from "@/lib/auth";

export const dynamic = "force-dynamic";

const attempts = new Map();
const WINDOW_MS = 60 * 1000;
const MAX_ATTEMPTS = 5;

const getIp = (request) => {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
};

const isRateLimited = (ip) => {
  const now = Date.now();
  const entry = attempts.get(ip) || { count: 0, firstAttempt: now };

  if (now - entry.firstAttempt > WINDOW_MS) {
    attempts.set(ip, { count: 1, firstAttempt: now });
    return false;
  }

  entry.count += 1;
  attempts.set(ip, entry);
  return entry.count > MAX_ATTEMPTS;
};

export async function POST(request) {
  const ip = getIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json({ message: "Too many attempts. Try again in a minute." }, { status: 429 });
  }

  const body = await request.json().catch(() => ({}));
  const result = await verifyAdminCredentials(body.id, body.password);

  if (!result.ok) {
    return NextResponse.json({ message: result.reason || "Invalid credentials." }, { status: 401 });
  }

  attempts.delete(ip);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, createSessionToken(), sessionCookieOptions);
  return response;
}
