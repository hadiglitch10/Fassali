"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import { ClothingItem, CATEGORY_LABELS_AR, STYLE_LABELS_AR } from "@/types";

interface ItemCardProps {
  item: ClothingItem;
  onDelete?: (id: string) => void;
  selectable?: boolean;
  selected?: boolean;
  onSelect?: (item: ClothingItem) => void;
}

export default function ItemCard({
  item,
  onDelete,
  selectable = false,
  selected = false,
  onSelect,
}: ItemCardProps) {
  const handleClick = () => {
    if (selectable && onSelect) onSelect(item);
  };

  return (
    <div
      onClick={handleClick}
      className={`relative group rounded-2xl overflow-hidden border transition-all duration-200 cursor-pointer ${
        selected
          ? "border-gold shadow-lg shadow-gold/20 scale-[0.98]"
          : "border-zinc-800 hover:border-zinc-600"
      } ${selectable ? "hover:scale-[0.98]" : ""}`}
    >
      {/* Image */}
      <div className="aspect-square bg-zinc-900 relative">
        <Image
          src={item.imageUrl}
          alt={item.name || CATEGORY_LABELS_AR[item.category]}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 33vw"
        />

        {/* Selected overlay */}
        {selected && (
          <div className="absolute inset-0 bg-gold/10 flex items-center justify-center">
            <div className="w-7 h-7 rounded-full bg-gold flex items-center justify-center shadow-lg">
              <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        )}

        {/* Delete button */}
        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(item.id);
            }}
            className="absolute top-2 left-2 w-7 h-7 rounded-full bg-black/70 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-500/80"
          >
            <Trash2 className="w-3.5 h-3.5 text-white" />
          </button>
        )}

        {/* Style badge */}
        <div className="absolute bottom-2 right-2">
          <span className="text-xs px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-zinc-300 border border-zinc-700/50">
            {STYLE_LABELS_AR[item.style]}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-2.5 bg-zinc-900">
        <p className="text-sm font-medium text-white truncate">
          {item.name || CATEGORY_LABELS_AR[item.category]}
        </p>
        <div className="flex items-center gap-1.5 mt-1">
          <div
            className="w-3 h-3 rounded-full border border-zinc-600 flex-shrink-0"
            style={{ backgroundColor: getColorHex(item.color) }}
          />
          <span className="text-xs text-zinc-400 truncate">{item.color}</span>
          <span className="text-zinc-700 text-xs">·</span>
          <span className="text-xs text-zinc-500">{CATEGORY_LABELS_AR[item.category]}</span>
        </div>
      </div>
    </div>
  );
}

function getColorHex(colorAr: string): string {
  const map: Record<string, string> = {
    أبيض: "#ffffff",
    أسود: "#1a1a1a",
    أزرق: "#3b82f6",
    "أزرق داكن": "#1e3a5f",
    أحمر: "#ef4444",
    أخضر: "#22c55e",
    أصفر: "#eab308",
    بني: "#92400e",
    رمادي: "#6b7280",
    وردي: "#ec4899",
    بنفسجي: "#a855f7",
    برتقالي: "#f97316",
    ذهبي: "#C9A84C",
    كحلي: "#1e3a5f",
    بيج: "#d4b896",
  };
  return map[colorAr] || "#888888";
}
