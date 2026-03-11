"use client";

import { useState } from "react";
import TopBar from "@/components/TopBar";
import { Sparkles, ShoppingBag, ChevronLeft, RefreshCw, TrendingUp } from "lucide-react";
import { MOCK_GAPS } from "@/lib/mockData";
import { MOCK_ITEMS } from "@/lib/mockData";
import { CATEGORY_LABELS_AR } from "@/types";

const PRIORITY_CONFIG = {
  high: { label: "أولوية عالية", color: "text-red-400", bg: "bg-red-500/10 border-red-500/30" },
  medium: { label: "أولوية متوسطة", color: "text-gold", bg: "bg-gold/10 border-gold/30" },
  low: { label: "أولوية منخفضة", color: "text-zinc-400", bg: "bg-zinc-800/50 border-zinc-700" },
};

export default function MissingPage() {
  const [analyzed, setAnalyzed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = () => {
    setLoading(true);
    setAnalyzed(false);
    setTimeout(() => {
      setLoading(false);
      setAnalyzed(true);
    }, 2000);
  };

  // Wardrobe coverage stats (mock)
  const totalCategories = 9;
  const coveredCategories = new Set(MOCK_ITEMS.map((i) => i.category)).size;
  const coveragePercent = Math.round((coveredCategories / totalCategories) * 100);

  return (
    <div className="min-h-screen bg-black">
      <TopBar title="ماذا ينقصني؟" subtitle="تحليل خزانتك بالذكاء الاصطناعي" />

      <div className="px-4 pt-4 pb-8 max-w-lg mx-auto">
        {/* Coverage card */}
        <div className="glass-card rounded-2xl p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-zinc-300">اكتمال الخزانة</p>
            <span className="text-2xl font-extrabold text-gold">{coveragePercent}%</span>
          </div>
          <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-gold-dark to-gold-light rounded-full transition-all duration-1000"
              style={{ width: `${coveragePercent}%` }}
            />
          </div>
          <p className="text-xs text-zinc-500 mt-2">
            {coveredCategories} من {totalCategories} فئات ملابس مغطاة
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {[
            { label: "القطع", count: MOCK_ITEMS.length, icon: "👕" },
            { label: "الفئات", count: coveredCategories, icon: "📦" },
            { label: "الثغرات", count: MOCK_GAPS.length, icon: "❗" },
          ].map((s) => (
            <div key={s.label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-center">
              <p className="text-xl mb-0.5">{s.icon}</p>
              <p className="text-lg font-bold text-white">{s.count}</p>
              <p className="text-xs text-zinc-500">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Analyze button */}
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gold hover:bg-gold-light text-black font-bold text-base transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-gold/20 mb-6"
        >
          {loading ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span>AI يحلل خزانتك...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>حلّل خزانتي</span>
            </>
          )}
        </button>

        {/* Loading */}
        {loading && (
          <div className="animate-pulse space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-zinc-900 rounded-2xl" />
            ))}
          </div>
        )}

        {/* Results */}
        {analyzed && !loading && (
          <div className="animate-fade-in-up space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-gold" />
              <p className="text-sm font-medium text-white">توصيات التسوق</p>
            </div>

            {MOCK_GAPS.map((gap, i) => {
              const config = PRIORITY_CONFIG[gap.priority];
              return (
                <div
                  key={i}
                  className={`glass-card rounded-2xl p-4 border ${config.bg} transition-all duration-200 hover:scale-[0.99]`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <ShoppingBag className={`w-4 h-4 ${config.color}`} />
                        <span className="text-white font-semibold text-sm">
                          {CATEGORY_LABELS_AR[gap.category]}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${config.bg} ${config.color}`}>
                          {config.label}
                        </span>
                      </div>
                      <p className="text-sm text-zinc-400 leading-relaxed">{gap.reasonAr}</p>
                    </div>
                    <ChevronLeft className="w-4 h-4 text-zinc-600 flex-shrink-0 mt-1" />
                  </div>
                </div>
              );
            })}

            {/* Shopping tip */}
            <div className="glass-card rounded-2xl p-4 gold-glow mt-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">💡</span>
                <div>
                  <p className="text-xs text-gold font-medium mb-1.5">نصيحة التسوق</p>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    ابدأ بالأولويات العالية — قطعتان أو ثلاث قطع متعددة الاستخدامات ستضاعف تنسيقاتك الممكنة أكثر من شراء قطع كثيرة متشابهة.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!analyzed && !loading && (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto mb-3">
              <span className="text-3xl">🔍</span>
            </div>
            <p className="text-zinc-500 text-sm">اضغط &ldquo;حلّل خزانتي&rdquo; ليقترح AI</p>
            <p className="text-zinc-700 text-xs mt-1">ما ينقصك لتكتمل إطلالاتك</p>
          </div>
        )}
      </div>
    </div>
  );
}
