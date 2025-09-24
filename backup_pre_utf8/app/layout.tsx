import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.echoproject.space"),
  title: "ECHO — послания после жизни",
  description:
    "апишите важные слова и отправьте их автоматически тогда, когда это действительно нужно.",
  openGraph: {
    title: "ECHO",
    description:
      "апишите важные слова и отправьте их автоматически тогда, когда это действительно нужно.",
    url: "https://www.echoproject.space",
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <meta charSet="utf-8" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}


