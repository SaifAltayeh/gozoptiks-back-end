import { NextResponse } from "next/server";
import { deleteProduct, loadCatalog, upsertProduct } from "@/backend/database";
import { requireAdmin } from "@/backend/require-admin";
import { revalidateStorefront } from "@/backend/revalidate";
import type { Product } from "@/backend/models";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = loadCatalog().products.find((item) => item.id === id);
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(product);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const product = (await request.json()) as Product;
  const saved = upsertProduct({ ...product, id });
  revalidateStorefront();
  return NextResponse.json(saved);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  deleteProduct(id);
  revalidateStorefront();
  return NextResponse.json({ ok: true });
}
