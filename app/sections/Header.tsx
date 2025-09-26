import Link from 'next/link';

export function Header() {
  return (
    <header className="border-b border-neutral-200">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-6">
        <Link href="/" className="font-semibold tracking-tight">ECHO</Link>
        <nav className="flex items-center gap-4">
          <Link href="/messages" className="hover:underline">Послания</Link>
          <Link href="/about" className="hover:underline">О проекте</Link>
          <Link href="/login" className="rounded-xl border px-3 py-2">Войти</Link>
        </nav>
      </div>
    </header>
  );
}
