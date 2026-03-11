"use client";

import { ClothingCategory, ClothingStyle, CATEGORY_LABELS_AR, STYLE_LABELS_AR } from "@/types";

interface FilterBarProps {
  activeCategory: ClothingCategory | "all";
  onCategoryChange: (cat: ClothingCategory | "all") => void;
}

const categories: (ClothingCategory | "all")[] = [
  "all",
  "shirt",
  "pants",
  "dress",
  "shoes",
  "jacket",
  "skirt",
  "bag",
  "accessory",
];

const categoryLabels: Record<ClothingCategory | "all", string> = {
  all: "الكل",
  ...CATEGORY_LABELS_AR,
};

export default function FilterBar({ activeCategory, onCategoryChange }: FilterBarProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none px-4">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onCategoryChange(cat)}
          className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
            activeCategory === cat
              ? "bg-gold text-black shadow-md shadow-gold/20"
              : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-600"
          }`}
        >
          {categoryLabels[cat]}
        </button>
      ))}
    </div>
  );
}
