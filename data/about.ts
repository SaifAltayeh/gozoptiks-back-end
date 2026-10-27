import type { AboutContent } from "@/backend/models";

export type AboutCopy = {
  title: string;
  tagline: string;
  paragraphs: string[];
  promiseTitle: string;
  promises: { title: string; text: string }[];
  close: string;
  contactTitle: string;
  details: { label: string; value: string }[];
  note: string;
  langLabel: string;
};

export const aboutCopy = {
  en: {
    title: "About Us",
    langLabel: "English",
    tagline: "More than what you need. Something you wear every day.",
    paragraphs: [
      "At gözoptik, we believe eyewear is more than a necessity. You wear it every day, so it should feel like you.",
      "We opened our doors in Amman in 2020 with a simple idea: to bring together precise eye care and a carefully chosen selection of frames and sunglasses from [international / independent] brands. Every pair is chosen for its craftsmanship, comfort and character, from timeless classics to statement pieces.",
      "Our team of [certified opticians / optometrists] takes the time to understand how you live, work and see. Whether it's a [comprehensive eye exam], prescription lenses fitted with care, or finding the frame that suits your face, we guide you through every step with honesty and attention to detail.",
      "Since 2020, we've been proud to serve our community as a Jordanian store, and we're here for the long run, with aftercare, adjustments and advice whenever you need them.",
    ],
    promiseTitle: "Our promise",
    promises: [
      { title: "Care", text: "We take the time to listen." },
      { title: "Precision", text: "Every lens measured, every frame adjusted." },
      { title: "Honesty", text: "Advice based on your needs, not on a sale." },
    ],
    close: "gözoptik. See well. Look like yourself.",
    contactTitle: "Contact & Store Information",
    details: [
      { label: "Business name", value: "gözoptik" },
      { label: "Established", value: "2020, Amman, Jordan" },
      { label: "Address", value: "[Street, area, Amman]" },
      { label: "Opening hours", value: "[Sat–Thu 10:00–22:00 · Fri 16:00–22:00]" },
      { label: "Phone", value: "[+962 …]" },
      { label: "WhatsApp", value: "[+962 …]" },
      { label: "Email", value: "[info@…]" },
      { label: "Instagram", value: "[@handle]" },
    ],
    note: "Have a question about a frame, an order or your prescription? Message us on WhatsApp for the fastest reply, or visit us in store. We reply to all messages within [24 hours] during working days.",
  },
  ar: {
    title: "من نحن",
    langLabel: "العربية",
    tagline: "أكثر من حاجة، جزء من يومك.",
    paragraphs: [
      "في جوز أوبتكس، نؤمن بأن النظارة ليست مجرد حاجة، بل هي جزء من حضورك اليومي، ولذلك يجب أن تعبّر عنك.",
      "افتتحنا أبوابنا في عمّان عام 2020 بفكرة بسيطة: أن نجمع بين العناية الدقيقة بالنظر ومجموعة مختارة بعناية من الإطارات والنظارات الشمسية من [علامات عالمية / مستقلة]. نختار كل قطعة لجودة صنعها وراحتها وطابعها الخاص، من التصاميم الكلاسيكية إلى القطع اللافتة.",
      "يحرص فريقنا من [أخصائيي البصريات] على فهم أسلوب حياتك واحتياجاتك، سواء كان ذلك [فحص نظر شامل]، أو عدسات طبية مركّبة بعناية، أو مساعدتك في اختيار الإطار الأنسب لملامحك. نرافقك في كل خطوة بصدق واهتمام بالتفاصيل.",
      "منذ عام 2020 ونحن نفخر بخدمة مجتمعنا كمتجر أردني، ونبقى إلى جانبك بعد الشراء بخدمات المتابعة والضبط والمشورة متى احتجت.",
    ],
    promiseTitle: "وعدنا",
    promises: [
      { title: "العناية", text: "نمنحك الوقت لنستمع إليك." },
      { title: "الدقة", text: "كل عدسة مقاسة، وكل إطار مضبوط." },
      { title: "الصدق", text: "نصيحة مبنية على احتياجك، لا على البيع." },
    ],
    close: "جوز أوبتكس. رؤية أوضح، وأسلوب يشبهك.",
    contactTitle: "معلومات التواصل والفروع",
    details: [
      { label: "الاسم التجاري", value: "جوز أوبتكس" },
      { label: "التأسيس", value: "2020، عمّان، الأردن" },
      { label: "العنوان", value: "[الشارع، المنطقة، عمّان]" },
      { label: "ساعات العمل", value: "[السبت–الخميس 10:00–22:00 · الجمعة 16:00–22:00]" },
      { label: "الهاتف", value: "[+962 …]" },
      { label: "واتساب", value: "[+962 …]" },
      { label: "البريد", value: "[info@…]" },
      { label: "إنستغرام", value: "[@الحساب]" },
    ],
    note: "لديك سؤال عن إطار أو طلب أو وصفتك الطبية؟ راسلنا عبر واتساب للحصول على أسرع رد، أو زرنا في الفرع. نرد على جميع الرسائل خلال [24 ساعة] في أيام العمل.",
  },
} as const satisfies Record<"en" | "ar", AboutCopy>;

export const defaultAbout: AboutContent = {
  heroImage: "/images/event/inside.jpg",
  storyImage: "/images/event/service.jpg",
  en: {
    title: aboutCopy.en.title,
    tagline: aboutCopy.en.tagline,
    kicker: "Amman · 2020",
    paragraphs: [...aboutCopy.en.paragraphs],
    promiseTitle: aboutCopy.en.promiseTitle,
    promises: aboutCopy.en.promises.map((item) => ({ ...item })),
    close: aboutCopy.en.close,
    langLabel: aboutCopy.en.langLabel,
  },
  ar: {
    title: aboutCopy.ar.title,
    tagline: aboutCopy.ar.tagline,
    kicker: "عمّان · 2020",
    paragraphs: [...aboutCopy.ar.paragraphs],
    promiseTitle: aboutCopy.ar.promiseTitle,
    promises: aboutCopy.ar.promises.map((item) => ({ ...item })),
    close: aboutCopy.ar.close,
    langLabel: aboutCopy.ar.langLabel,
  },
};
