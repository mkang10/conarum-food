// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { ClientProvider } from "./provider";

// Font cấu hình
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  variable: "--font-bevietnam",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Booking Conarum",
  description:
    "Hệ thống đặt đồ ăn nội bộ công ty Conarum — nhanh, tiện và tiết kiệm thời gian.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      className={`${inter.variable} ${beVietnamPro.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
