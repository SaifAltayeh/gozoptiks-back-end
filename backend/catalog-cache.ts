import type { Database } from "@/backend/types";

let snapshot: Database | null = null;

export function setCatalogSnapshot(db: Database) {
  snapshot = db;
}

export function getCatalogSnapshot(): Database {
  if (!snapshot) {
    throw new Error("Catalog has not been loaded.");
  }
  return snapshot;
}

export function tryGetCatalogSnapshot(): Database | null {
  return snapshot;
}
