import { NextResponse } from "next/server";
import { ADMIN_COOKIE, getAdminPassword, getAdminToken } from "@/backend/auth";

export async function POST(request: Request) {
  const body = (await request.json()) as { password?: string };
  if (body.password !== getAdminPassword()) {
    return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, await getAdminToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
  return response;
}
