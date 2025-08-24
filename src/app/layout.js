// src/app/layout.js
import ClientLayout from "@/components/ClientLayout"; // Impor komponen baru kita
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
  title: "Luvky Johanes • Frontend Developer",
  description: "Portofolio Luvky Johanes",
  icons: {
    icon: "/Logo.svg",
    shortcut: "/Logo.svg",
    apple: "/Logo.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={gtFont.variable}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
