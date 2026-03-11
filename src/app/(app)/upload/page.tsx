"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import TopBar from "@/components/TopBar";
import {
  Upload,
  Camera,
  Sparkles,
  CheckCircle,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import {
  ClothingCategory,
  ClothingStyle,
  Season,
  CATEGORY_LABELS_AR,
  STYLE_LABELS_AR,
  SEASON_LABELS_AR,
} from "@/types";

type Step = "upload" | "processing" | "review" | "done";

interface AnalysisResult {
  category: ClothingCategory;
  color: string;
  style: ClothingStyle;
  season: Season[];
  name: string;
}

const MOCK_ANALYSIS: AnalysisResult = {
  category: "shirt",
  color: "أبيض",
  style: "casual",
  season: ["spring", "summer"],
  name: "تيشيرت كاجوال",
};

export default function UploadPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState<Step>("upload");
  const [preview, setPreview] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [processingStep, setProcessingStep] = useState(0);

  const processingSteps = [
    "إزالة الخلفية...",
    "تحليل القطعة بالذكاء الاصطناعي...",
    "تحديد الفئة واللون...",
    "حفظ في الخزانة...",
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
      startProcessing();
    };
    reader.readAsDataURL(file);
  };

  const startProcessing = () => {
    setStep("processing");
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setProcessingStep(step);
      if (step >= processingSteps.length) {
        clearInterval(interval);
        setTimeout(() => {
          setAnalysis(MOCK_ANALYSIS);
          setStep("review");
        }, 600);
      }
    }, 800);
  };

  const handleSave = () => {
    setStep("done");
    setTimeout(() => router.push("/wardrobe"), 1500);
  };

  const handleReset = () => {
    setStep("upload");
    setPreview(null);
    setAnalysis(null);
    setProcessingStep(0);
  };

  return (
    <div className="min-h-screen bg-black">
      <TopBar title="إضافة قطعة" showNotification={false} />

      <div className="px-4 pt-4 pb-8 max-w-lg mx-auto">
        {/* Step: Upload */}
        {step === "upload" && (
          <div className="animate-fade-in-up">
            <p className="text-zinc-400 text-sm mb-6 text-center">
              صوّر قطعة ملابسك وسنحللها تلقائياً بالذكاء الاصطناعي
            </p>

            {/* Upload area */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="relative border-2 border-dashed border-zinc-700 rounded-3xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-gold/50 hover:bg-zinc-900/30 transition-all duration-200 group mb-4"
            >
              <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 group-hover:border-gold/30 flex items-center justify-center mb-4 transition-colors duration-200">
                <Upload className="w-7 h-7 text-zinc-500 group-hover:text-gold transition-colors duration-200" />
              </div>
              <p className="text-white font-semibold mb-1">اختر صورة</p>
              <p className="text-zinc-500 text-sm">PNG, JPG حتى 10MB</p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Camera shortcut */}
            <button
              onClick={() => {
                if (fileInputRef.current) {
                  fileInputRef.current.removeAttribute("capture");
                  fileInputRef.current.click();
                }
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-zinc-800 hover:border-zinc-600 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-medium text-sm transition-all duration-200"
            >
              <Camera className="w-4 h-4" />
              التقاط صورة
            </button>

            {/* Tips */}
            <div className="mt-6 p-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl">
              <p className="text-sm font-medium text-zinc-300 mb-2">نصائح للحصول على أفضل نتيجة:</p>
              <ul className="space-y-1.5">
                {[
                  "📸 ضع الملابس على خلفية مضيئة",
                  "🎯 تأكد من وضوح الصورة كاملاً",
                  "💡 إضاءة جيدة تساعد AI على التحليل",
                ].map((tip, i) => (
                  <li key={i} className="text-xs text-zinc-500">{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Step: Processing */}
        {step === "processing" && (
          <div className="animate-fade-in-up flex flex-col items-center py-10">
            {preview && (
              <div className="relative w-48 h-48 rounded-2xl overflow-hidden border border-zinc-800 mb-8">
                <Image src={preview} alt="Preview" fill className="object-cover" />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border-2 border-gold border-t-transparent animate-spin" />
                </div>
              </div>
            )}

            <p className="text-white font-semibold mb-6 text-lg">جارٍ التحليل...</p>

            <div className="w-full max-w-xs space-y-3">
              {processingSteps.map((s, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      i < processingStep
                        ? "bg-gold"
                        : i === processingStep
                        ? "border-2 border-gold border-t-transparent animate-spin"
                        : "border-2 border-zinc-700"
                    }`}
                  >
                    {i < processingStep && (
                      <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span
                    className={`text-sm transition-colors duration-300 ${
                      i < processingStep
                        ? "text-zinc-400 line-through"
                        : i === processingStep
                        ? "text-white font-medium"
                        : "text-zinc-600"
                    }`}
                  >
                    {s}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step: Review */}
        {step === "review" && analysis && (
          <div className="animate-fade-in-up">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
              </div>
              <p className="text-zinc-300 text-sm">تحليل الذكاء الاصطناعي</p>
            </div>

            {/* Preview + analysis */}
            <div className="glass-card rounded-3xl overflow-hidden mb-4">
              {preview && (
                <div className="relative h-56 bg-zinc-950">
                  <Image src={preview} alt="Preview" fill className="object-contain p-4" />
                </div>
              )}
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 text-sm">الاسم</span>
                  <input
                    defaultValue={analysis.name}
                    className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1.5 text-sm text-white text-right focus:outline-none focus:border-gold/50 transition-colors"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 text-sm">الفئة</span>
                  <span className="text-sm font-medium text-white bg-zinc-800 px-3 py-1.5 rounded-lg">
                    {CATEGORY_LABELS_AR[analysis.category]}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 text-sm">اللون</span>
                  <span className="text-sm font-medium text-white">{analysis.color}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 text-sm">الأسلوب</span>
                  <span className="text-sm font-medium text-white">
                    {STYLE_LABELS_AR[analysis.style]}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 text-sm">الموسم</span>
                  <div className="flex gap-1">
                    {analysis.season.map((s) => (
                      <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-gold/10 border border-gold/30 text-gold">
                        {SEASON_LABELS_AR[s]}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-3 rounded-2xl border border-zinc-800 hover:border-zinc-600 bg-zinc-900 text-zinc-400 text-sm font-medium transition-all duration-200"
              >
                <RefreshCw className="w-4 h-4" />
                إعادة
              </button>
              <button
                onClick={handleSave}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-gold hover:bg-gold-light text-black font-semibold text-sm transition-all duration-200"
              >
                <CheckCircle className="w-4 h-4" />
                حفظ في الخزانة
              </button>
            </div>
          </div>
        )}

        {/* Step: Done */}
        {step === "done" && (
          <div className="animate-fade-in-up flex flex-col items-center py-16 text-center">
            <div className="w-20 h-20 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mb-4">
              <CheckCircle className="w-10 h-10 text-gold" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">تمت الإضافة!</h2>
            <p className="text-zinc-400 text-sm">تم حفظ القطعة في خزانتك</p>
            <div className="flex items-center gap-1 mt-4 text-zinc-600 text-xs">
              <ArrowRight className="w-3.5 h-3.5" />
              <span>جارٍ التوجيه إلى الخزانة...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
