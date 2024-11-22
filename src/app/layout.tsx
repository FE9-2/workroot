import React from "react";

import ClientLayout from "./clientLayout";
import Header from "./components/layout/Header";
import "./globals.css";
import { metadata } from "./metadata";
import { viewport } from "./viewport";

export { metadata, viewport };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <ClientLayout>
          <Header />
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
