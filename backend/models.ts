export type StockStatus = "in_stock" | "out_of_stock";

export type Currency = {
  code: string;
  symbol: string;
  locale: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type ContactInfo = {
  addressLines: string[];
  mapUrl: string | null;
  phone: string | null;
  email: string | null;
  hours: string | null;
  instagram: string | null;
  social: SocialLink[];
  notes: string;
};

export type ShippingMethod = {
  id: string;
  name: string;
  fee: number;
  description: string;
  demo: boolean;
};

export type PaymentMethod = {
  id: string;
  label: string;
  description: string;
};

export type FooterConfig = {
  blurb: string;
  shopTitle: string;
  brandsTitle: string;
  storeTitle: string;
  note: string;
  categoryIds: string[];
  brandIds: string[];
};

export type StoreConfig = {
  name: string;
  wordmark: string;
  currency: Currency;
  announcement: {
    enabled: boolean;
    text: string;
    href: string;
  };
  contact: ContactInfo;
  footer: FooterConfig;
  shippingMethods: ShippingMethod[];
  payment: {
    methods: PaymentMethod[];
    providerConfigured: boolean;
    note: string;
  };
  email: {
    configured: boolean;
    note: string;
  };
};

export type Brand = {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo: string | null;
  image: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  parentId: string | null;
  featured: boolean;
};

export type AboutLocale = {
  title: string;
  tagline: string;
  kicker: string;
  paragraphs: string[];
  promiseTitle: string;
  promises: { title: string; text: string }[];
  close: string;
  langLabel: string;
};

export type AboutContent = {
  heroImage: string;
  storyImage: string;
  en: AboutLocale;
  ar: AboutLocale;
};

export type VariationOption = {
  id: string;
  label: string;
  available: boolean;
  images?: string[];
  price?: number;
  stockStatus?: StockStatus;
  stockQuantity?: number;
};

export type ProductVariation = {
  id: string;
  type: "color" | "size" | "lens";
  name: string;
  options: VariationOption[];
};

export type ProductAttribute = {
  label: string;
  value: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  brandId: string;
  modelId?: string;
  categoryIds: string[];
  description: string;
  images: string[];
  hoverImage?: string;
  price: number;
  originalPrice?: number;
  stockStatus: StockStatus;
  stockQuantity?: number;
  variations: ProductVariation[];
  attributes: ProductAttribute[];
  featured: boolean;
  createdAt: string;
  relatedIds: string[];
  colors: string[];
  frameShape: string;
  productType: "sunglasses" | "optical";
};

export type HomepageHeroSlide = {
  id: string;
  heading: string;
  text?: string;
  image: string;
  ctaLabel: string;
  ctaHref: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryHref?: string;
  align: "left" | "right";
  imagePosition: string;
  campaign?: string;
  order?: number;
  active?: boolean;
};

export type HomepageSection = {
  id: string;
  title: string;
  description?: string;
  type: "products" | "brands" | "categories" | "editorial";
  productIds?: string[];
  brandIds?: string[];
  categoryIds?: string[];
  ctaLabel?: string;
  ctaHref?: string;
  image?: string;
  secondaryImage?: string;
  order: number;
  active: boolean;
};

export type CartItem = {
  key: string;
  productId: string;
  slug: string;
  name: string;
  brandName: string;
  image: string;
  quantity: number;
  unitPrice: number;
  variantLabel: string | null;
  variantId: string | null;
  stockStatus: StockStatus;
  stockQuantity?: number;
};

export type PaymentStatus = "pending" | "successful" | "failed" | "cancelled";
export type OrderStatus = "demo_recorded" | "awaiting_payment" | "paid" | "cancelled";

export type OrderCustomer = {
  fullName: string;
  email: string;
  phone: string;
};

export type OrderDelivery = {
  country: string;
  city: string;
  area: string;
  street: string;
  building: string;
  instructions: string;
};

export type Order = {
  reference: string;
  createdAt: string;
  customer: OrderCustomer;
  delivery: OrderDelivery;
  items: CartItem[];
  subtotal: number;
  shippingMethodId: string;
  shippingMethodName: string;
  shippingFee: number;
  total: number;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  notes: string[];
};

export type ProductFilters = {
  brand?: string[];
  category?: string[];
  color?: string[];
  type?: string[];
  availability?: StockStatus;
  priceMin?: number;
  priceMax?: number;
};

export type SortKey = "featured" | "price-asc" | "price-desc" | "newest" | "alpha";
