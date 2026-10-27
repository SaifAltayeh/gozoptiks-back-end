const encoder = new TextEncoder();

export const ADMIN_COOKIE = "goz-admin";

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "gozoptik";
}

async function sha256Hex(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(value));
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function getAdminToken() {
  return sha256Hex(`gözoptik:${getAdminPassword()}`);
}

export async function isAdminToken(value: string | undefined | null) {
  return Boolean(value) && value === (await getAdminToken());
}
