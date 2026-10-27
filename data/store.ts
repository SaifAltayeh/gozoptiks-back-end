import type { StoreConfig } from "@/backend/models";

/**
 * Central store configuration.
 * Replace placeholder contact fields, currency, shipping, and payment
 * notes with live business details when they are supplied.
 */
export const store: StoreConfig = {
  name: "gözoptik",
  wordmark: "gözoptik",
  currency: {
    code: "JOD",
    symbol: "JOD",
    locale: "en",
  },
  announcement: {
    enabled: true,
    text: "Andy and Astoria — the Barner edit is in.",
    href: "/brands/barner",
  },
  contact: {
    addressLines: [],
    mapUrl: null,
    phone: null,
    email: null,
    hours: null,
    instagram: null,
    social: [],
    notes:
      "Store address, phone, email, opening hours, map link, and social accounts have not been supplied. These fields are left empty on purpose and can be filled in this file.",
  },
  footer: {
    blurb: "Eyewear, considered. A customer-facing storefront built around the gözoptik wordmark and supplied campaign photography.",
    shopTitle: "Shop",
    brandsTitle: "Brands",
    storeTitle: "Store",
    note: "Demo catalog. Live inventory, payments, and email require backend configuration.",
    categoryIds: [],
    brandIds: [],
  },
  shippingMethods: [
    {
      id: "standard",
      name: "Standard delivery",
      fee: 3,
      description: "Demo shipping option. Replace with live rates from the store backend.",
      demo: true,
    },
    {
      id: "express",
      name: "Express delivery",
      fee: 8,
      description: "Demo shipping option. Replace with live rates from the store backend.",
      demo: true,
    },
    {
      id: "pickup",
      name: "Store pickup",
      fee: 0,
      description: "Demo option. Confirm pickup location before taking live orders.",
      demo: true,
    },
  ],
  payment: {
    methods: [
      {
        id: "visa",
        label: "Visa",
        description:
          "Visa will be processed through a hosted payment provider. The provider is not connected in this frontend.",
      },
    ],
    providerConfigured: false,
    note: "No payment credentials are stored here. Orders remain unpaid until a trusted payment provider confirms the charge.",
  },
  email: {
    configured: false,
    note: "Order confirmation email will be sent by the trusted order service after a real order is created. This demo does not send email.",
  },
};
