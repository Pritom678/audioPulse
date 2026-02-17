"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Shared/Header";
import Footer from "@/components/Shared/Footer";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    // Admin routes - no header/footer
    return <>{children}</>;
  }

  // Regular routes - with header/footer
  return (
    <>
      <Header />
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
