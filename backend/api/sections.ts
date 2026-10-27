import { NextResponse } from "next/server";
import { loadCatalog, slugify, upsertHomepageSection } from "@/backend/database";
import { requireAdmin } from "@/backend/require-admin";
import { revalidateStorefront } from "@/backend/revalidate";
import type { HomepageSection } from "@/backend/models";

export function GET() {
  return NextResponse.json(loadCatalog().homepageSections);
}

export async function POST(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const section = (await request.json()) as HomepageSection;
  if (!section.title) return NextResponse.json({ error: "Name is required." }, { status: 400 });
  if (!section.id) section.id = slugify(section.title) || `section-${Date.now()}`;
  if (section.order === undefined) section.order = loadCatalog().homepageSections.length + 1;
  const saved = upsertHomepageSection(section);
  revalidateStorefront();
  return NextResponse.json(saved, { status: 201 });
}
