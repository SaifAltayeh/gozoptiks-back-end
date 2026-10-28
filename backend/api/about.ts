import { NextResponse } from "next/server";
import { loadCatalog, saveAbout } from "@/backend/database";
import { requireAdmin } from "@/backend/require-admin";
import { revalidateStorefront } from "@/backend/revalidate";
import type { AboutContent } from "@/backend/models";

export function GET() {
  return NextResponse.json(loadCatalog().about);
}

export async function PUT(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const about = (await request.json()) as AboutContent;
    if (!about?.en || !about?.ar) {
      return NextResponse.json({ error: "About content is incomplete." }, { status: 400 });
    }
    const saved = saveAbout(about);
    revalidateStorefront();
    return NextResponse.json(saved);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not save About Us." }, { status: 500 });
  }
}
