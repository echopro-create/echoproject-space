import "../styles/globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ECHO — послания в будущее",
  description: "Оставьте слова тем, кого любите. Мы доставим их в нужный момент."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <a href="#main" className="skip-link">К содержанию</a>
        <header className="border-b border-border">
          <div className="container flex items-center justify-between h-14">
            <Link href="/" className="font-semibold tracking-tight">ECHO</Link>
            <nav className="text-sm">
              <Link href="/how" className="mr-4">Как это работает</Link>
              <Link href="/security" className="mr-4">Безопасность</Link>
              <Link href="/login" className="mr-4">Войти</Link>
            </nav>
          </div>
        </header>
        <main id="main">{children}</main>
        <footer className="border-t border-border mt-16">
          <div className="container py-10 text-sm text-muted">
            © {new Date().getFullYear()} ECHO · <Link href="/privacy">Приватность</Link> · <Link href="/terms">Условия</Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
