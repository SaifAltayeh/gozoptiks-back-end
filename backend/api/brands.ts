import { NextResponse } from "next/server";
import { loadCatalog, slugify, upsertBrand } from "@/backend/database";
import { requireAdmin } from "@/backend/require-admin";
import { revalidateStorefront } from "@/backend/revalidate";
import type { Brand } from "@/backend/models";

export function GET() {
  return NextResponse.json(loadCatalog().brands);
}

export async function POST(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const brand = (await request.json()) as Brand;
  if (!brand.name) return NextResponse.json({ error: "Name is required." }, { status: 400 });
  if (!brand.id) brand.id = slugify(brand.name);
  if (!brand.slug) brand.slug = brand.id;
  const saved = upsertBrand(brand);
  revalidateStorefront();
  return NextResponse.json(saved, { status: 201 });
}
