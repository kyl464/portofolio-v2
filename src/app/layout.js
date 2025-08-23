// src/app/layout.js
import Navbar from "@/components/navbar";
import PageWrapper from "@/components/pageWrapper";
import localFont from "next/font/local";
import "./globals.css";

const gtFont = localFont({
  src: [
    {
      path: "./fonts/GT-Reguler.woff2",
      weight: "400", // 400 adalah standar untuk 'regular'
      style: "normal",
    },
    {
      path: "./fonts/GT-Bold.woff2",
      weight: "700", // 700 adalah standar untuk 'bold'
      style: "normal",
    },
  ],
  variable: "--font-sans", // Nama variabel CSS untuk digunakan di Tailwind
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={gtFont.variable}>
        <PageWrapper>
          <Navbar />
          {children}
        </PageWrapper>
      </body>
    </html>
  );
}
