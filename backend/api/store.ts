import { NextResponse } from "next/server";
import { loadCatalog, saveStore } from "@/backend/database";
import { requireAdmin } from "@/backend/require-admin";
import { revalidateStorefront } from "@/backend/revalidate";
import type { StoreConfig } from "@/backend/models";

export function GET() {
  return NextResponse.json(loadCatalog().store);
}

export async function PUT(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const store = (await request.json()) as StoreConfig;
  const saved = saveStore(store);
  revalidateStorefront();
  return NextResponse.json(saved);
}
