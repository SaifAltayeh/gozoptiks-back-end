import { NextResponse } from "next/server";
import { deleteHomepageSection, upsertHomepageSection } from "@/backend/database";
import { requireAdmin } from "@/backend/require-admin";
import { revalidateStorefront } from "@/backend/revalidate";
import type { HomepageSection } from "@/backend/models";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const section = (await request.json()) as HomepageSection;
  const saved = upsertHomepageSection({ ...section, id });
  revalidateStorefront();
  return NextResponse.json(saved);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  deleteHomepageSection(id);
  revalidateStorefront();
  return NextResponse.json({ ok: true });
}
