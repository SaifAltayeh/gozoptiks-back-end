import { NextResponse } from "next/server";
import { ADMIN_COOKIE } from "@/backend/auth";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, "", { path: "/", maxAge: 0 });
  return response;
}
