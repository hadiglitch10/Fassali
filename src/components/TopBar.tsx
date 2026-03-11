"use client";

import { Bell } from "lucide-react";

interface TopBarProps {
  title?: string;
  subtitle?: string;
  showNotification?: boolean;
}

export default function TopBar({ title = "فصّلي", subtitle, showNotification = true }: TopBarProps) {
  return (
    <header className="sticky top-0 z-40 bg-black/90 backdrop-blur-md border-b border-zinc-800/60">
      <div className="flex items-center justify-between px-4 py-3 max-w-lg mx-auto">
        <div>
          <h1 className="text-lg font-bold text-white leading-tight">{title}</h1>
          {subtitle && <p className="text-xs text-zinc-400">{subtitle}</p>}
        </div>
        {showNotification && (
          <button className="relative w-9 h-9 flex items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 hover:border-gold/50 transition-colors duration-200">
            <Bell className="w-4 h-4 text-zinc-400" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-gold" />
          </button>
        )}
      </div>
    </header>
  );
}
