import { NextResponse } from "next/server";
import { loadCatalog } from "@/backend/database";

export function GET() {
  return NextResponse.json(loadCatalog());
}
