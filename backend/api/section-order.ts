import { NextResponse } from "next/server";
import { reorderHomepageSections } from "@/backend/database";
import { requireAdmin } from "@/backend/require-admin";
import { revalidateStorefront } from "@/backend/revalidate";

export async function PUT(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await request.json()) as { ids?: string[] };
  if (!body.ids?.length) {
    return NextResponse.json({ error: "ids required" }, { status: 400 });
  }
  const sections = reorderHomepageSections(body.ids);
  revalidateStorefront();
  return NextResponse.json(sections);
}
