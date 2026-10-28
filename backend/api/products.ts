import { NextResponse } from "next/server";
import { loadCatalog, slugify, upsertProduct } from "@/backend/database";
import { requireAdmin } from "@/backend/require-admin";
import { revalidateStorefront } from "@/backend/revalidate";
import type { Product } from "@/backend/models";

export async function GET() {
  return NextResponse.json((await loadCatalog()).products);
}

export async function POST(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const product = (await request.json()) as Product;
  if (!product.name) return NextResponse.json({ error: "Name is required." }, { status: 400 });
  if (!product.id) product.id = slugify(product.name) || `product-${Date.now()}`;
  if (!product.slug) product.slug = product.id;
  if (!product.createdAt) product.createdAt = new Date().toISOString().slice(0, 10);
  const saved = await upsertProduct(product);
  revalidateStorefront();
  return NextResponse.json(saved, { status: 201 });
}
