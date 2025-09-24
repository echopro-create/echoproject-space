import "../styles/styles.css";
import Link from "next/link";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import MobileNav from "./components/MobileNav";

const inter = Inter({ subsets: ["latin", "cyrillic"], display: "swap" });

export const metadata: Metadata = {
  title: "ECHO  Послания после жизни",
  description: "Сообщения, которые дойдут тогда, когда это действительно важно.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className="light">
      <body className={inter.className}>
        <a href="#main" className="skip-link">Пропустить к содержанию</a>
        <header className="site-header">
          <div className="container">
            <Link href="/" className="logo">ECHO</Link>
          </div>
        </header>
        <main id="main">{children}</main>
        <MobileNav />
      </body>
    </html>
  );
}

