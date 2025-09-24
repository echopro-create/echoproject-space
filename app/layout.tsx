import "./../styles/styles.css";
import type { Metadata } from "next";
import MobileNav from "./components/MobileNav";

export const metadata: Metadata = {
  title: "ECHO  Р СџР С•РЎРѓР В»Р В°Р Р…Р С‘РЎРЏ Р С—Р С•РЎРѓР В»Р Вµ Р В¶Р С‘Р В·Р Р…Р С‘",
  description:
    "Р вЂ”Р В°Р С—Р С‘РЎв‚¬Р С‘РЎвЂљР Вµ Р Р†Р В°Р В¶Р Р…РЎвЂ№Р Вµ РЎРѓР В»Р С•Р Р†Р В°  ECHO Р С—Р ВµРЎР‚Р ВµР Т‘Р В°РЎРѓРЎвЂљ Р С‘РЎвЂ¦ РЎвЂљР ВµР С, Р С”РЎвЂљР С• Р Т‘Р С•РЎР‚Р С•Р С–, Р Р† Р Р…РЎС“Р В¶Р Р…РЎвЂ№Р в„– Р СР С•Р СР ВµР Р…РЎвЂљ: Р С—Р С• Р Т‘Р В°РЎвЂљР Вµ, Р С—Р С• РЎРѓР С•Р В±РЎвЂ№РЎвЂљР С‘РЎР‹ Р С‘Р В»Р С‘ Р С—Р С•РЎРѓР В»Р Вµ РЎС“РЎвЂ¦Р С•Р Т‘Р В°.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  themeColor: "#FFFFFF",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>`r`n        <a href="#main" className="skip-link">Перейти к содержимому</a>
        <header className="header">
          <div className="container">
            <Link href="/" className="logo">ECHO</Link>
          </div>
        </header>

        <main id="main" id="main">{children}</main>

        <MobileNav />
        <footer className="footer" />
      </body>
    </html>
  );
}