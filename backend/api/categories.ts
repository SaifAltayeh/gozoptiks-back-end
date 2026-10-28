import { NextResponse } from "next/server";
import { loadCatalog, slugify, upsertCategory } from "@/backend/database";
import { requireAdmin } from "@/backend/require-admin";
import { revalidateStorefront } from "@/backend/revalidate";
import type { Category } from "@/backend/models";

export async function GET() {
  return NextResponse.json((await loadCatalog()).categories);
}

export async function POST(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const category = (await request.json()) as Category;
  if (!category.name) return NextResponse.json({ error: "Name is required." }, { status: 400 });
  if (!category.id) category.id = slugify(category.name);
  if (!category.slug) category.slug = category.id;
  const saved = await upsertCategory(category);
  revalidateStorefront();
  return NextResponse.json(saved, { status: 201 });
}
