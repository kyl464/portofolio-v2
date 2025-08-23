// src/app/layout.js

import Navbar from "@/components/navbar";
import PageWrapper from "@/components/pageWrapper";
import localFont from "next/font/local";
import "./globals.css";

// 2. KONFIGURASI FONT LOKAL
const gtWalsheim = localFont({
  src: [
    {
      path: "../fonts/GT-Pantheon-Text-Regular-Trial.woff2",
      weight: "400", // '400' adalah untuk 'normal'
      style: "normal",
    },
    {
      path: "../fonts/GT-Pantheon-Text-Bold-Trial.woff2",
      weight: "700", // '700' adalah untuk 'bold'
      style: "normal",
    },
  ],
  variable: "--font-gt", // Buat CSS Variable untuk font ini
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      {/* 3. TERAPKAN VARIABLE FONT BARU */}
      <body className={gtWalsheim.variable}>
        <PageWrapper>
          <Navbar />
          {children}
        </PageWrapper>
      </body>
    </html>
  );
}
