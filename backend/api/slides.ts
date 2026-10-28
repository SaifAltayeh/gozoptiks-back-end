import { NextResponse } from "next/server";
import { loadCatalog, slugify, upsertHeroSlide } from "@/backend/database";
import { requireAdmin } from "@/backend/require-admin";
import { revalidateStorefront } from "@/backend/revalidate";
import type { HomepageHeroSlide } from "@/backend/models";

export async function GET() {
  return NextResponse.json((await loadCatalog()).heroSlides);
}

export async function POST(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const slide = (await request.json()) as HomepageHeroSlide;
  if (!slide.heading) return NextResponse.json({ error: "Heading is required." }, { status: 400 });
  if (!slide.id) slide.id = slugify(slide.heading) || `slide-${Date.now()}`;
  if (slide.order === undefined) slide.order = (await loadCatalog()).heroSlides.length;
  if (slide.active === undefined) slide.active = true;
  const saved = await upsertHeroSlide(slide);
  revalidateStorefront();
  return NextResponse.json(saved, { status: 201 });
}
