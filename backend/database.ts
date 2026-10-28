import { defaultAbout } from "@/data/about";
import { brands, categories, heroSlides, homepageSections, products } from "@/data/catalog";
import { store } from "@/data/store";
import { setCatalogSnapshot } from "@/backend/catalog-cache";
import { readStoredCatalog, writeStoredCatalog } from "@/backend/storage";
import type { Database } from "@/backend/types";
import type { AboutContent, Brand, Category, HomepageHeroSlide, HomepageSection, Order, Product, StoreConfig } from "@/backend/models";

function seed(): Database {
  return {
    products: structuredClone(products),
    brands: structuredClone(brands),
    categories: structuredClone(categories),
    orders: [],
    heroSlides: structuredClone(heroSlides),
    homepageSections: structuredClone(homepageSections),
    store: structuredClone(store),
    about: structuredClone(defaultAbout),
  };
}

async function persist(db: Database) {
  setCatalogSnapshot(db);
  await writeStoredCatalog(db);
}

export async function loadCatalog(): Promise<Database> {
  const stored = await readStoredCatalog();
  if (!stored) {
    const created = seed();
    await persist(created);
    return created;
  }

  const { db, changed } = migrateHomepage(stored);
  if (changed) await persist(db);
  else setCatalogSnapshot(db);
  return db;
}

function migrateHomepage(db: Database) {
  let changed = false;
  if (!db.homepageSections.some((section) => section.type === "categories")) {
    db.homepageSections.push({
      id: "home-categories",
      title: "Shop by category",
      description: "",
      type: "categories",
      categoryIds: ["sunglasses", "optical", "lenses"],
      ctaLabel: "All categories",
      ctaHref: "/categories",
      order: 0,
      active: true,
    });
    changed = true;
  } else {
    db.homepageSections = db.homepageSections.map((section) => {
      if (section.type !== "categories" || (section.categoryIds && section.categoryIds.length)) return section;
      changed = true;
      return {
        ...section,
        categoryIds: ["sunglasses", "optical", "lenses"],
        ctaLabel: section.ctaLabel ?? "All categories",
        ctaHref: section.ctaHref ?? "/categories",
      };
    });
  }
  if (!db.homepageSections.some((section) => section.type === "editorial")) {
    db.homepageSections.push({
      id: "optical-portrait",
      title: "Close to the face",
      description: "Studio portraits from the Indie Soul campaign. Thick acetate, direct light, no extra story attached.",
      type: "editorial",
      image: "/images/editorial/indie-01.jpg",
      ctaLabel: "Shop optical",
      ctaHref: "/categories/optical",
      order: 2,
      active: true,
    });
    changed = true;
  }
  if (!db.homepageSections.some((section) => section.type === "brands")) {
    db.homepageSections.push({
      id: "home-brands",
      title: "Shop by brand",
      type: "brands",
      order: 3.5,
      active: true,
    });
    changed = true;
  }
  const slides = db.heroSlides.map((slide, index) => ({
    ...slide,
    order: slide.order ?? index,
    active: slide.active !== false,
  }));
  if (JSON.stringify(slides) !== JSON.stringify(db.heroSlides)) {
    db.heroSlides = slides;
    changed = true;
  }
  if (!db.store.footer) {
    db.store.footer = structuredClone(store.footer);
    changed = true;
  }
  if (!db.about) {
    db.about = structuredClone(defaultAbout);
    changed = true;
  }
  db.categories = db.categories.map((category) => {
    if (typeof category.featured === "boolean") return category;
    changed = true;
    return { ...category, featured: ["sunglasses", "optical", "lenses"].includes(category.id) };
  });
  return { db, changed };
}

export async function saveStore(next: StoreConfig) {
  const db = await loadCatalog();
  db.store = next;
  await saveCatalog(db);
  return next;
}

export async function saveAbout(next: AboutContent) {
  const db = await loadCatalog();
  db.about = next;
  await saveCatalog(db);
  return next;
}

export async function saveCatalog(db: Database) {
  await persist(db);
}

export async function upsertProduct(product: Product) {
  const db = await loadCatalog();
  const index = db.products.findIndex((item) => item.id === product.id);
  if (index >= 0) db.products[index] = product;
  else db.products.unshift(product);
  await saveCatalog(db);
  return product;
}

export async function deleteProduct(id: string) {
  const db = await loadCatalog();
  db.products = db.products.filter((item) => item.id !== id);
  await saveCatalog(db);
}

export async function upsertBrand(brand: Brand) {
  const db = await loadCatalog();
  const index = db.brands.findIndex((item) => item.id === brand.id);
  if (index >= 0) db.brands[index] = brand;
  else db.brands.push(brand);
  await saveCatalog(db);
  return brand;
}

export async function deleteBrand(id: string) {
  const db = await loadCatalog();
  db.brands = db.brands.filter((item) => item.id !== id);
  await saveCatalog(db);
}

export async function upsertCategory(category: Category) {
  const db = await loadCatalog();
  const next = { ...category, featured: Boolean(category.featured) };
  const index = db.categories.findIndex((item) => item.id === next.id);
  if (index >= 0) db.categories[index] = next;
  else db.categories.push(next);
  const featuredIds = db.categories.filter((item) => item.featured).map((item) => item.id);
  db.homepageSections = db.homepageSections.map((section) =>
    section.type === "categories" ? { ...section, categoryIds: featuredIds } : section,
  );
  await saveCatalog(db);
  return next;
}

export async function deleteCategory(id: string) {
  const db = await loadCatalog();
  db.categories = db.categories.filter((item) => item.id !== id);
  await saveCatalog(db);
}

export async function addOrder(order: Order) {
  const db = await loadCatalog();
  db.orders.unshift(order);
  await saveCatalog(db);
  return order;
}

export async function updateOrder(reference: string, patch: Partial<Order>) {
  const db = await loadCatalog();
  const index = db.orders.findIndex((item) => item.reference === reference);
  if (index < 0) return null;
  db.orders[index] = { ...db.orders[index], ...patch };
  await saveCatalog(db);
  return db.orders[index];
}

export async function upsertHeroSlide(slide: HomepageHeroSlide) {
  const db = await loadCatalog();
  const index = db.heroSlides.findIndex((item) => item.id === slide.id);
  if (index >= 0) db.heroSlides[index] = slide;
  else db.heroSlides.push(slide);
  await saveCatalog(db);
  return slide;
}

export async function deleteHeroSlide(id: string) {
  const db = await loadCatalog();
  db.heroSlides = db.heroSlides.filter((item) => item.id !== id);
  await saveCatalog(db);
}

export async function upsertHomepageSection(section: HomepageSection) {
  const db = await loadCatalog();
  const index = db.homepageSections.findIndex((item) => item.id === section.id);
  if (index >= 0) db.homepageSections[index] = section;
  else db.homepageSections.push(section);
  await saveCatalog(db);
  return section;
}

export async function deleteHomepageSection(id: string) {
  const db = await loadCatalog();
  db.homepageSections = db.homepageSections.filter((item) => item.id !== id);
  await saveCatalog(db);
}

export async function reorderHomepageSections(ids: string[]) {
  const db = await loadCatalog();
  db.homepageSections = db.homepageSections.map((section) => {
    const index = ids.indexOf(section.id);
    return index >= 0 ? { ...section, order: index } : section;
  });
  await saveCatalog(db);
  return db.homepageSections.sort((a, b) => a.order - b.order);
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
