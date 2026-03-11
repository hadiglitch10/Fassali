"use client";

import Image from "next/image";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import { MOCK_USER } from "@/lib/firebase";
import { MOCK_ITEMS } from "@/lib/mockData";
import {
  LogOut,
  Settings,
  HelpCircle,
  ChevronLeft,
  Shield,
  Bell,
  Globe,
  Star,
} from "lucide-react";

export default function ProfilePage() {
  const stats = [
    { label: "قطعة ملابس", value: MOCK_ITEMS.length },
    { label: "إطلالة محفوظة", value: 3 },
    { label: "يوم معنا", value: 30 },
  ];

  const menuItems = [
    { icon: Bell, label: "الإشعارات", sub: "تفعيل تنبيهات الأزياء" },
    { icon: Globe, label: "اللغة", sub: "العربية" },
    { icon: Shield, label: "الخصوصية", sub: "إدارة بياناتك" },
    { icon: HelpCircle, label: "المساعدة", sub: "تواصل معنا" },
    { icon: Settings, label: "الإعدادات", sub: "تخصيص التطبيق" },
  ];

  return (
    <div className="min-h-screen bg-black">
      <TopBar title="حسابي" showNotification={false} />

      <div className="px-4 pt-4 pb-8 max-w-lg mx-auto space-y-4">
        {/* Profile card */}
        <div className="glass-card rounded-3xl p-5">
          <div className="flex items-center gap-4 mb-5">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-gold/30 flex-shrink-0">
              <Image
                src={MOCK_USER.photoURL}
                alt={MOCK_USER.displayName || ""}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-white">{MOCK_USER.displayName}</h2>
              <p className="text-sm text-zinc-400">{MOCK_USER.email}</p>
              <div className="flex items-center gap-1 mt-1">
                <Star className="w-3 h-3 text-gold fill-current" />
                <span className="text-xs text-gold">عضو مجاني</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {stats.map((s) => (
              <div key={s.label} className="bg-zinc-800/60 rounded-xl p-3 text-center">
                <p className="text-xl font-extrabold text-white">{s.value}</p>
                <p className="text-xs text-zinc-500 mt-0.5 leading-tight">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Upgrade banner */}
        <div className="relative rounded-2xl overflow-hidden border border-gold/30 p-4 gold-glow">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent" />
          <div className="relative flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-gold mb-0.5">قريباً — فصّلي برو ✨</p>
              <p className="text-xs text-zinc-400">تحليلات متقدمة وتوصيات غير محدودة</p>
            </div>
            <button className="flex-shrink-0 px-4 py-2 rounded-xl bg-gold text-black text-xs font-bold hover:bg-gold-light transition-colors">
              قريباً
            </button>
          </div>
        </div>

        {/* Menu */}
        <div className="glass-card rounded-2xl overflow-hidden divide-y divide-zinc-800">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-zinc-800/30 transition-colors duration-200 text-right"
              >
                <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-zinc-400" />
                </div>
                <div className="flex-1 text-right">
                  <p className="text-sm font-medium text-white">{item.label}</p>
                  <p className="text-xs text-zinc-500">{item.sub}</p>
                </div>
                <ChevronLeft className="w-4 h-4 text-zinc-600 flex-shrink-0" />
              </button>
            );
          })}
        </div>

        {/* Sign out */}
        <Link href="/">
          <button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-red-500/30 hover:border-red-500/60 bg-red-500/5 hover:bg-red-500/10 text-red-400 font-medium text-sm transition-all duration-200">
            <LogOut className="w-4 h-4" />
            تسجيل الخروج
          </button>
        </Link>

        {/* App info */}
        <p className="text-center text-xs text-zinc-700 pt-2">
          فصّلي v0.1.0 · مصنوع بـ ❤️ للموضة العربية
        </p>
      </div>
    </div>
  );
}
