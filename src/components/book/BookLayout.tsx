import { useEffect, ReactNode } from "react";
import { TRTHeader } from "@/components/landing/trt/TRTHeader";
import { TRTFooter } from "@/components/landing/trt/TRTFooter";

interface BookLayoutProps {
  page: "symptom" | "duration" | "schedule" | "confirmed" | "lets-talk";
  title: string;
  children: ReactNode;
}

const BookLayout = ({ page, title, children }: BookLayoutProps) => {
  useEffect(() => {
    document.title = title;
    document.body.dataset.page = page;
    return () => {
      delete document.body.dataset.page;
    };
  }, [page, title]);

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "Inter, sans-serif", background: "#0B1029" }}>
      <TRTHeader />
      <main className="flex-1 pt-16 animate-in fade-in duration-200">{children}</main>
      <TRTFooter />
    </div>
  );
};

export default BookLayout;
