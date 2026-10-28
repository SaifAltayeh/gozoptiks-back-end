import { NextResponse } from "next/server";
import { deleteHeroSlide, upsertHeroSlide } from "@/backend/database";
import { requireAdmin } from "@/backend/require-admin";
import { revalidateStorefront } from "@/backend/revalidate";
import type { HomepageHeroSlide } from "@/backend/models";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const slide = (await request.json()) as HomepageHeroSlide;
  const saved = await upsertHeroSlide({ ...slide, id });
  revalidateStorefront();
  return NextResponse.json(saved);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  await deleteHeroSlide(id);
  revalidateStorefront();
  return NextResponse.json({ ok: true });
}
