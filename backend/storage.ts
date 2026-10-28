import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { list, put } from "@vercel/blob";
import type { Database } from "@/backend/types";

const BLOB_PATH = "catalog/db.json";
const runtimeDir = process.env.VERCEL
  ? path.join("/tmp", "gozoptiks")
  : path.join(process.cwd(), "data", "runtime");
const filePath = path.join(runtimeDir, "db.json");

function canUseBlob() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);
}

export async function readStoredCatalog(): Promise<Database | null> {
  if (canUseBlob()) {
    try {
      const { blobs } = await list({ prefix: BLOB_PATH });
      const blob = blobs.find((item) => item.pathname === BLOB_PATH) ?? blobs[0];
      if (!blob) return null;
      const response = await fetch(blob.url, { cache: "no-store" });
      if (!response.ok) return null;
      return (await response.json()) as Database;
    } catch (error) {
      console.error("Could not read catalog blob", error);
      return null;
    }
  }

  if (!existsSync(filePath)) return null;
  return JSON.parse(readFileSync(filePath, "utf8")) as Database;
}

export async function writeStoredCatalog(db: Database) {
  const payload = JSON.stringify(db);

  if (canUseBlob()) {
    await put(BLOB_PATH, payload, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      cacheControlMaxAge: 0,
    });
    return;
  }

  if (!existsSync(runtimeDir)) mkdirSync(runtimeDir, { recursive: true });
  writeFileSync(filePath, JSON.stringify(db, null, 2));
}
