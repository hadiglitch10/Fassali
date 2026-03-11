import Link from "next/link";
import { Sparkles, Star } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-zinc-800/30 rounded-full blur-2xl" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 pt-12 pb-4">
        <div />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-gold" />
          </div>
          <span className="text-white font-bold text-lg">فصّلي</span>
        </div>
        <div />
      </header>

      {/* Hero */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/30 mb-6">
          <Star className="w-3.5 h-3.5 text-gold" fill="currentColor" />
          <span className="text-gold text-xs font-medium">مدعوم بالذكاء الاصطناعي</span>
        </div>

        {/* Logo mark */}
        <div className="relative mb-8">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/20 flex items-center justify-center mx-auto shadow-2xl shadow-gold/10">
            <span className="text-4xl font-extrabold gold-shimmer">ف</span>
          </div>
          <div className="absolute -inset-3 rounded-[2rem] border border-gold/10 animate-pulse" />
        </div>

        {/* Headline */}
        <h1 className="text-4xl font-extrabold text-white mb-3 leading-tight">
          خزانة ملابسك
          <br />
          <span className="gold-shimmer">بالذكاء الاصطناعي</span>
        </h1>

        <p className="text-zinc-400 text-base max-w-xs leading-relaxed mb-10">
          صوّر ملابسك، واحصل على توصيات أزياء مخصصة لكل مناسبة بضغطة واحدة.
        </p>

        {/* Features */}
        <div className="flex flex-col gap-3 w-full max-w-xs mb-10">
          {[
            { emoji: "📸", text: "رفع الملابس تلقائياً مع تحليل AI" },
            { emoji: "✨", text: "تنسيق أزياء مخصص لكل مناسبة" },
            { emoji: "🛍️", text: "اكتشف ما ينقص خزانتك" },
          ].map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-zinc-900/60 border border-zinc-800 rounded-xl px-4 py-3 text-right"
            >
              <span className="text-xl">{f.emoji}</span>
              <span className="text-sm text-zinc-300 flex-1">{f.text}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="w-full max-w-xs flex flex-col gap-3">
          <Link href="/wardrobe" className="w-full">
            <button className="w-full flex items-center justify-center gap-3 bg-white text-black font-semibold py-3.5 rounded-2xl hover:bg-zinc-100 transition-all duration-200 shadow-lg">
              {/* Google icon */}
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              متابعة مع Google
            </button>
          </Link>

          <p className="text-xs text-zinc-600 text-center px-4">
            بالمتابعة، أنت توافق على شروط الاستخدام وسياسة الخصوصية
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 pb-8 text-center">
        <p className="text-zinc-700 text-xs">فصّلي © 2024 · مصنوع بـ ❤️ للموضة العربية</p>
      </footer>
    </div>
  );
}
