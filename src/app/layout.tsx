import React from "react";

import ClientLayout from "./clientLayout";
import Header from "./components/layout/Header";
import "./globals.css";
import { metadata } from "./metadata";
import { viewport } from "./viewport";

export { metadata, viewport };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="scrollbar-custom">
        <ClientLayout>
          <Header />
          <main className="min-h-screen pt-16">{children}</main>
        </ClientLayout>
      </body>
    </html>
  );
}
