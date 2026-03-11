"use client";

import { useState } from "react";
import TopBar from "@/components/TopBar";
import ItemCard from "@/components/ItemCard";
import FilterBar from "@/components/FilterBar";
import { MOCK_ITEMS } from "@/lib/mockData";
import { ClothingItem, ClothingCategory } from "@/types";
import { Search } from "lucide-react";
import Link from "next/link";

export default function WardrobePage() {
  const [items, setItems] = useState<ClothingItem[]>(MOCK_ITEMS);
  const [activeCategory, setActiveCategory] = useState<ClothingCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = items.filter((item) => {
    const matchCat = activeCategory === "all" || item.category === activeCategory;
    const matchSearch =
      !searchQuery ||
      (item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
      item.color.includes(searchQuery);
    return matchCat && matchSearch;
  });

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div className="min-h-screen bg-black">
      <TopBar
        title="خزانتي"
        subtitle={`${items.length} قطعة ملابس`}
      />

      <div className="px-4 pt-4 pb-2">
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="ابحث في ملابسك..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pr-10 pl-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-gold/50 transition-colors duration-200"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { label: "كاجوال", count: items.filter((i) => i.style === "casual").length, color: "text-blue-400" },
            { label: "رسمي", count: items.filter((i) => i.style === "formal").length, color: "text-gold" },
            { label: "أنيق", count: items.filter((i) => i.style === "elegant").length, color: "text-pink-400" },
          ].map((s) => (
            <div key={s.label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-center">
              <p className={`text-xl font-bold ${s.color}`}>{s.count}</p>
              <p className="text-xs text-zinc-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filter */}
      <FilterBar activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

      {/* Grid */}
      <div className="px-4 mt-4">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4">
              <span className="text-3xl">👗</span>
            </div>
            <p className="text-zinc-400 font-medium mb-1">لا توجد قطع ملابس</p>
            <p className="text-zinc-600 text-sm mb-4">ابدأ بإضافة ملابسك لبناء خزانتك</p>
            <Link href="/upload">
              <button className="px-5 py-2 bg-gold text-black text-sm font-semibold rounded-xl hover:bg-gold-light transition-colors">
                إضافة قطعة
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filtered.map((item) => (
              <ItemCard key={item.id} item={item} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
