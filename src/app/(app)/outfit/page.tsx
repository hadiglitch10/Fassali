"use client";

import { useState } from "react";
import Image from "next/image";
import TopBar from "@/components/TopBar";
import { Sparkles, RefreshCw, Heart, Share2 } from "lucide-react";
import { Occasion, OCCASION_LABELS_AR, CATEGORY_LABELS_AR } from "@/types";
import { MOCK_OUTFIT, MOCK_ITEMS } from "@/lib/mockData";

const OCCASIONS: { id: Occasion; emoji: string }[] = [
  { id: "casual", emoji: "☀️" },
  { id: "work", emoji: "💼" },
  { id: "date", emoji: "💕" },
  { id: "wedding", emoji: "💍" },
  { id: "sport", emoji: "🏃" },
];

export default function OutfitPage() {
  const [selectedOccasion, setSelectedOccasion] = useState<Occasion>("casual");
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    setGenerated(false);
    setTimeout(() => {
      setLoading(false);
      setGenerated(true);
      setLiked(false);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-black">
      <TopBar title="تنسيق الأزياء" subtitle="اختر المناسبة واحصل على إطلالة مميزة" />

      <div className="px-4 pt-4 pb-8 max-w-lg mx-auto">
        {/* Occasion picker */}
        <div className="mb-6">
          <p className="text-sm text-zinc-400 mb-3">اختر المناسبة</p>
          <div className="grid grid-cols-5 gap-2">
            {OCCASIONS.map((occ) => (
              <button
                key={occ.id}
                onClick={() => {
                  setSelectedOccasion(occ.id);
                  setGenerated(false);
                }}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border transition-all duration-200 ${
                  selectedOccasion === occ.id
                    ? "border-gold bg-gold/10 shadow-md shadow-gold/10"
                    : "border-zinc-800 bg-zinc-900 hover:border-zinc-700"
                }`}
              >
                <span className="text-2xl">{occ.emoji}</span>
                <span
                  className={`text-xs font-medium leading-tight text-center ${
                    selectedOccasion === occ.id ? "text-gold" : "text-zinc-500"
                  }`}
                >
                  {OCCASION_LABELS_AR[occ.id]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Generate button */}
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gold hover:bg-gold-light text-black font-bold text-base transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-gold/20 mb-6"
        >
          {loading ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span>يحضّر AI إطلالتك...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>اقترح إطلالة</span>
            </>
          )}
        </button>

        {/* Loading skeleton */}
        {loading && (
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-zinc-800 rounded-full w-1/3" />
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-square bg-zinc-900 rounded-2xl" />
              ))}
            </div>
            <div className="h-20 bg-zinc-900 rounded-2xl" />
          </div>
        )}

        {/* Result */}
        {generated && !loading && (
          <div className="animate-fade-in-up space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-gold" />
                </div>
                <p className="text-sm font-medium text-white">إطلالتك الموصى بها</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLiked(!liked)}
                  className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-200 ${
                    liked ? "border-red-500 bg-red-500/10" : "border-zinc-700 hover:border-zinc-500"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${liked ? "text-red-500 fill-current" : "text-zinc-500"}`} />
                </button>
                <button className="w-8 h-8 rounded-full border border-zinc-700 hover:border-zinc-500 flex items-center justify-center transition-colors duration-200">
                  <Share2 className="w-4 h-4 text-zinc-500" />
                </button>
              </div>
            </div>

            {/* Items grid */}
            <div className="grid grid-cols-3 gap-3">
              {MOCK_OUTFIT.items.map((item) => (
                <div key={item.id} className="flex flex-col gap-1.5">
                  <div className="aspect-square rounded-2xl overflow-hidden border border-zinc-800 relative bg-zinc-900">
                    <Image src={item.imageUrl} alt={item.name || ""} fill className="object-cover" />
                  </div>
                  <p className="text-xs text-zinc-400 text-center leading-tight">
                    {item.name || CATEGORY_LABELS_AR[item.category]}
                  </p>
                </div>
              ))}
            </div>

            {/* Styling tip */}
            <div className="glass-card rounded-2xl p-4 gold-glow">
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">✨</span>
                <div>
                  <p className="text-xs text-gold font-medium mb-1.5">نصيحة الأسلوب</p>
                  <p className="text-sm text-zinc-300 leading-relaxed">{MOCK_OUTFIT.stylingTipAr}</p>
                </div>
              </div>
            </div>

            {/* Regenerate */}
            <button
              onClick={handleGenerate}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border border-zinc-800 hover:border-zinc-600 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-sm font-medium transition-all duration-200"
            >
              <RefreshCw className="w-4 h-4" />
              اقتراح آخر
            </button>
          </div>
        )}

        {/* Empty wardrobe state */}
        {!generated && !loading && (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto mb-3">
              <span className="text-3xl">🎨</span>
            </div>
            <p className="text-zinc-500 text-sm">اختر مناسبة واضغط &ldquo;اقترح إطلالة&rdquo;</p>
            <p className="text-zinc-700 text-xs mt-1">AI سيختار أفضل توليفة من ملابسك</p>
          </div>
        )}
      </div>
    </div>
  );
}
