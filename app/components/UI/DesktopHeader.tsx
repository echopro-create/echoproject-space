import Link from "next/link";

export default function DesktopHeader() {
  return (
    <header className="hidden lg:flex items-center justify-between px-[var(--gutter-desktop)] h-16 border-b border-[var(--colors-border)] bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <Link href="/" className="font-medium tracking-tight">ECHO</Link>
      <nav className="flex items-center gap-6 text-sm">
        <Link href="/messages" className="hover:opacity-80">Послания</Link>
        <Link href="/how" className="hover:opacity-80">Как это работает</Link>
        <Link href="/security" className="hover:opacity-80">Безопасность</Link>
        <Link href="/login" className="btn">Войти</Link>
      </nav>
    </header>
  );
}