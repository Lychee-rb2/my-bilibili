import type { Metadata } from "next";
import "./globals.css";
import { getLocale, t } from "@repo/i18n";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: t("Title"),
  description: t("Description"),
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang={getLocale()}>
      <body className={`container mx-auto bg-gray-100`}>
        <div className="bg-white">{children}</div>
      </body>
    </html>
  );
}
