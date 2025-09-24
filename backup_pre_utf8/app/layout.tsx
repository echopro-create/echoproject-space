import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.echoproject.space"),
  title: "ECHO вЂ” РїРѕСЃР»Р°РЅРёСЏ РїРѕСЃР»Рµ Р¶РёР·РЅРё",
  description:
    "Р°РїРёС€РёС‚Рµ РІР°Р¶РЅС‹Рµ СЃР»РѕРІР° Рё РѕС‚РїСЂР°РІСЊС‚Рµ РёС… Р°РІС‚РѕРјР°С‚РёС‡РµСЃРєРё С‚РѕРіРґР°, РєРѕРіРґР° СЌС‚Рѕ РґРµР№СЃС‚РІРёС‚РµР»СЊРЅРѕ РЅСѓР¶РЅРѕ.",
  openGraph: {
    title: "ECHO",
    description:
      "Р°РїРёС€РёС‚Рµ РІР°Р¶РЅС‹Рµ СЃР»РѕРІР° Рё РѕС‚РїСЂР°РІСЊС‚Рµ РёС… Р°РІС‚РѕРјР°С‚РёС‡РµСЃРєРё С‚РѕРіРґР°, РєРѕРіРґР° СЌС‚Рѕ РґРµР№СЃС‚РІРёС‚РµР»СЊРЅРѕ РЅСѓР¶РЅРѕ.",
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




