import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.echoproject.space"),
  title: "ECHO � �������� ����� �����",
  description:
    "������� ������ ����� � ��������� �� ������������� �����, ����� ��� ������������� �����.",
  openGraph: {
    title: "ECHO",
    description:
      "������� ������ ����� � ��������� �� ������������� �����, ����� ��� ������������� �����.",
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


