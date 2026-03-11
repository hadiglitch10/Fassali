import BottomNav from "@/components/BottomNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black pb-24">
      {children}
      <BottomNav />
    </div>
  );
}
