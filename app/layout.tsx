import "../styles/styles.css";
import type { Metadata, Viewport } from "next";
import AppChrome from "./components/AppChrome";
import { inter } from "./lib/fonts";

export const metadata: Metadata = {
  title: "ECHO",
  description: "РџРѕСЃР»Р°РЅРёСЏ, РєРѕС‚РѕСЂС‹Рµ Р±СѓРґСѓС‚ РґРѕСЃС‚Р°РІР»РµРЅС‹ РїРѕР·Р¶Рµ",
  icons: { icon: "/favicon.ico" }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={inter.variable}>
      <head><link rel="icon" href="/favicon.svg" sizes="any" /></head><body className="font-sans">
        <a href="#main" className="skip-link">РџСЂРѕРїСѓСЃС‚РёС‚СЊ Рє СЃРѕРґРµСЂР¶РёРјРѕРјСѓ</a>
        <AppChrome>{children}</AppChrome>
      </body>
    </html>
  );
}
