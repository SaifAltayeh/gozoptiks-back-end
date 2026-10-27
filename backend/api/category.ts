import { NextResponse } from "next/server";
import { deleteCategory, upsertCategory } from "@/backend/database";
import { requireAdmin } from "@/backend/require-admin";
import { revalidateStorefront } from "@/backend/revalidate";
import type { Category } from "@/backend/models";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const category = (await request.json()) as Category;
  const saved = upsertCategory({ ...category, id });
  revalidateStorefront();
  return NextResponse.json(saved);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  deleteCategory(id);
  revalidateStorefront();
  return NextResponse.json({ ok: true });
}
