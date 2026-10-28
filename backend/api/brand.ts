import { NextResponse } from "next/server";
import { deleteBrand, upsertBrand } from "@/backend/database";
import { requireAdmin } from "@/backend/require-admin";
import { revalidateStorefront } from "@/backend/revalidate";
import type { Brand } from "@/backend/models";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const brand = (await request.json()) as Brand;
  const saved = await upsertBrand({ ...brand, id });
  revalidateStorefront();
  return NextResponse.json(saved);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  await deleteBrand(id);
  revalidateStorefront();
  return NextResponse.json({ ok: true });
}
