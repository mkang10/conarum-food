import type { Metadata } from "next";
import { Inter, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { ClientProvider } from "./provider";

// Dùng kết hợp Inter (đẹp cho tiếng Anh) và Be Vietnam Pro (đẹp cho tiếng Việt)
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-bevietnam",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Booking Conarum",
  description: "Hệ thống đặt đồ ăn nội bộ công ty Conarum — nhanh, tiện và tiết kiệm thời gian.",
  generator: "Booking Conarum",
  alternates: {
    canonical: "https://booking.conarum.example/",
  },
  openGraph: {
    siteName: "Booking Conarum",
    title: "Đặt đồ ăn nội bộ công ty Conarum",
    description: "Nhanh chóng, tiện lợi và tối ưu quy trình đặt đồ ăn cho nhân viên.",
    type: "website",
    url: "https://booking.conarum.example/",
    locale: "vi_VN",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/booking-conarum-og.jpg",
        alt: "Booking Conarum - hệ thống đặt đồ ăn nội bộ công ty",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Booking Conarum",
    description: "Đặt đồ ăn nội bộ công ty Conarum — nhanh và tiện.",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/booking-conarum-og.jpg",
        alt: "Booking Conarum",
      },
    ],
    site: "@conarum",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      className={`${inter.variable} ${beVietnamPro.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="font-sans bg-neutral-50 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100 overflow-x-hidden">
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
