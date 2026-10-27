import type {
  AboutContent,
  Brand,
  Category,
  HomepageHeroSlide,
  HomepageSection,
  Order,
  Product,
  StoreConfig,
} from "@/backend/models";

export type Database = {
  products: Product[];
  brands: Brand[];
  categories: Category[];
  orders: Order[];
  heroSlides: HomepageHeroSlide[];
  homepageSections: HomepageSection[];
  store: StoreConfig;
  about: AboutContent;
};
