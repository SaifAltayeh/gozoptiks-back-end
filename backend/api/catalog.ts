import { NextResponse } from "next/server";
import { loadCatalog } from "@/backend/database";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  return NextResponse.json(await loadCatalog(), {
    headers: { "Cache-Control": "no-store, must-revalidate" },
  });
}
