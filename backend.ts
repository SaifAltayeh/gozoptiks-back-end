/**
 * gözoptik backend
 *
 * Database, auth, and API handlers live in /backend.
 */
export {
  addOrder,
  deleteBrand,
  deleteCategory,
  deleteHeroSlide,
  deleteHomepageSection,
  deleteProduct,
  loadCatalog,
  reorderHomepageSections,
  saveAbout,
  saveCatalog,
  saveStore,
  slugify,
  updateOrder,
  upsertBrand,
  upsertCategory,
  upsertHeroSlide,
  upsertHomepageSection,
  upsertProduct,
} from "@/backend/database";
export { ADMIN_COOKIE, getAdminPassword, getAdminToken, isAdminToken } from "@/backend/auth";
export { requireAdmin } from "@/backend/require-admin";
export type { Database } from "@/backend/types";
