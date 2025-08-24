// src/app/layout.js
import Navbar from "@/components/navbar";
import PageWrapper from "@/components/pageWrapper";
import localFont from "next/font/local";
import "@/styles/globals.css";
const gtFont = localFont({
  src: [
    {
      path: "./fonts/GT-Reguler.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/GT-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sans",
});

export const metadata = {
  title: "Luvky Johanes",
  description: "Portofolio Luvky Johanes",
};

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
