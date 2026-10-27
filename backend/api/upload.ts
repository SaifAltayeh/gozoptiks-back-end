import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/backend/require-admin";
import { slugify } from "@/backend/database";

const allowed = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"]);
const extensions: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
};

export async function POST(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Choose an image from your laptop." }, { status: 400 });
  }
  if (!allowed.has(file.type)) {
    return NextResponse.json({ error: "Use a JPG, PNG, WEBP, GIF, or AVIF image." }, { status: 400 });
  }
  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json({ error: "Image must be under 10MB." }, { status: 400 });
  }

  const ext = extensions[file.type];
  const base = slugify(file.name.replace(/\.[^.]+$/, "")) || "image";
  const name = `${Date.now()}-${base}.${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, name), Buffer.from(await file.arrayBuffer()));

  return NextResponse.json({ url: `/uploads/${name}` });
}
