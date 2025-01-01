import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Confider",
  description: "The Deal Flow Engine for Small Business Funding & Exits",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body id="__next" className={`${inter.className} bg-gray-50`}>
        <div>
          <section>
            {children}
            <Toaster richColors duration={20000} />
          </section>
        </div>
      </body>
    </html>
  );
}
