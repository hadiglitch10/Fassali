import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: "فصّلي | مساعدك الذكي للأزياء",
  description: "بناء خزانة ملابسك الرقمية واحصل على توصيات أزياء مخصصة بالذكاء الاصطناعي",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className="dark">
      <body className={`${cairo.variable} font-sans bg-black text-white min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
