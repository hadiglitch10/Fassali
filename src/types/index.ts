export interface ClothingItem {
  id: string;
  userId: string;
  imageUrl: string;
  originalImageUrl: string;
  category: ClothingCategory;
  color: string;
  style: ClothingStyle;
  season: Season[];
  name?: string;
  brand?: string;
  createdAt: Date;
}

export type ClothingCategory =
  | "shirt"
  | "pants"
  | "dress"
  | "shoes"
  | "jacket"
  | "skirt"
  | "bag"
  | "accessory"
  | "other";

export type ClothingStyle = "casual" | "formal" | "sports" | "elegant" | "traditional";

export type Season = "spring" | "summer" | "autumn" | "winter";

export type Occasion = "casual" | "work" | "date" | "wedding" | "sport";

export interface Outfit {
  id: string;
  items: ClothingItem[];
  occasion: Occasion;
  stylingTip: string;
  stylingTipAr: string;
  createdAt: Date;
}

export interface WardrobeGap {
  category: ClothingCategory;
  reason: string;
  reasonAr: string;
  priority: "high" | "medium" | "low";
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export const CATEGORY_LABELS_AR: Record<ClothingCategory, string> = {
  shirt: "قميص",
  pants: "بنطلون",
  dress: "فستان",
  shoes: "حذاء",
  jacket: "جاكيت",
  skirt: "تنورة",
  bag: "حقيبة",
  accessory: "إكسسوار",
  other: "أخرى",
};

export const STYLE_LABELS_AR: Record<ClothingStyle, string> = {
  casual: "كاجوال",
  formal: "رسمي",
  sports: "رياضي",
  elegant: "أنيق",
  traditional: "تقليدي",
};

export const SEASON_LABELS_AR: Record<Season, string> = {
  spring: "ربيع",
  summer: "صيف",
  autumn: "خريف",
  winter: "شتاء",
};

export const OCCASION_LABELS_AR: Record<Occasion, string> = {
  casual: "يومي",
  work: "العمل",
  date: "موعد رومانسي",
  wedding: "حفل زفاف",
  sport: "رياضة",
};
