import { NextResponse } from "next/server";

const ADMIN_COOKIE = "faraz_admin_session";
const ADMIN_PATH = "/faraz-control-room";

const toBase64Url = (buffer) => {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

const decodeBase64Url = (value) => {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
  return atob(padded);
};

const verifyToken = async (token) => {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!token || !secret) {
    return false;
  }

  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) {
    return false;
  }

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signed = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(encodedPayload));
  const expectedSignature = toBase64Url(signed);

  if (signature !== expectedSignature) {
    return false;
  }

  try {
    const payload = JSON.parse(decodeBase64Url(encodedPayload));
    return payload.sub === process.env.ADMIN_ID && payload.exp > Math.floor(Date.now() / 1000);
  } catch (error) {
    return false;
  }
};

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const isAdminPage = pathname.startsWith(ADMIN_PATH) && pathname !== `${ADMIN_PATH}/login`;
  const isAdminApi = pathname.startsWith("/api/admin") && pathname !== "/api/admin/login";

  if (!isAdminPage && !isAdminApi) {
    return NextResponse.next();
  }

  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  const authorized = await verifyToken(token);

  if (authorized) {
    return NextResponse.next();
  }

  if (isAdminApi) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = `${ADMIN_PATH}/login`;
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/faraz-control-room/:path*", "/api/admin/:path*"],
};
