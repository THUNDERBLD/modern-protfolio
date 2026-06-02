import { NextResponse } from "next/server";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/auth";
import { uploadBufferToCloudinary } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

export async function POST(request) {
  const token = request.cookies.get(ADMIN_COOKIE)?.value;

  if (!verifySessionToken(token)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const folder = formData.get("folder") || "modern-portfolio";

  if (!file || typeof file.arrayBuffer !== "function") {
    return NextResponse.json({ message: "Image file is required." }, { status: 400 });
  }

  if (!file.type?.startsWith("image/")) {
    return NextResponse.json({ message: "Only image uploads are allowed." }, { status: 400 });
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const uploaded = await uploadBufferToCloudinary(buffer, folder);
    return NextResponse.json(uploaded);
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ message: err.message || "Upload process failed." }, { status: 500 });
  }
}
