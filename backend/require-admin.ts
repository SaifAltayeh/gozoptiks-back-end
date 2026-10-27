import { cookies } from "next/headers";
import { ADMIN_COOKIE, isAdminToken } from "@/backend/auth";

export async function requireAdmin() {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  return isAdminToken(token);
}
