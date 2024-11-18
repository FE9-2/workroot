import React from "react";

import ClientLayout from "./clientLayout";
import Header from "./components/Header";
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
        <Header />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
