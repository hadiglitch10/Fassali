"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Grid3x3, Sparkles, Plus, ShoppingBag, User } from "lucide-react";

const navItems = [
  { href: "/wardrobe", icon: Grid3x3, label: "خزانتي" },
  { href: "/outfit", icon: Sparkles, label: "تنسيق" },
  { href: "/upload", icon: Plus, label: "إضافة", isPrimary: true },
  { href: "/missing", icon: ShoppingBag, label: "ناقص" },
  { href: "/profile", icon: User, label: "حسابي" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 bg-zinc-950 border-t border-zinc-800/80 pb-safe">
      <div className="flex items-center justify-around px-2 pt-2 pb-1 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          if (item.isPrimary) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center -mt-6"
              >
                <span className="flex items-center justify-center w-14 h-14 rounded-full bg-gold shadow-lg shadow-gold/30 hover:bg-gold-light transition-colors duration-200">
                  <Icon className="w-6 h-6 text-black" strokeWidth={2.5} />
                </span>
                <span className="text-xs mt-1 text-zinc-400">{item.label}</span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all duration-200"
            >
              <Icon
                className={`w-5 h-5 transition-colors duration-200 ${
                  isActive ? "text-gold" : "text-zinc-500"
                }`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span
                className={`text-xs transition-colors duration-200 ${
                  isActive ? "text-gold" : "text-zinc-500"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
