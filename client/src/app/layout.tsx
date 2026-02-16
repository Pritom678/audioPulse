import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/components/Shared/ToasterProvider";
import { WishlistProvider } from "@/context/WishlistContext";
import ConditionalLayout from "./ConditionalLayout";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "AudioPulse - Premium Headphones",
  description: "Discover premium audio experiences with AudioPulse headphones",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className={`${nunito.className} antialiased`}>
        <WishlistProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
          <ToastProvider />
        </WishlistProvider>
      </body>
    </html>
  );
}
