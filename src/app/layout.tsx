import React from "react";
import ClientLayout from "./clientLayout";
import Header from "./components/layout/Header";
import "./globals.css";
import { metadata } from "./metadata";
import { viewport } from "./viewport";
import { hakgyoFont, nexonFont } from "./fonts";

export { metadata, viewport };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${hakgyoFont.variable} ${nexonFont.variable}`}>
      <body className="scrollbar-custom">
        <ClientLayout>
          <Header />
          <main className="min-h-[80vh] pt-16">{children}</main>
        </ClientLayout>
      </body>
    </html>
  );
}
