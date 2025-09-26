export function Header() {
  return (
    <header className="w-full border-b border-black/10">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <a href="/" className="font-semibold tracking-tight">ECHO</a>
        <nav className="text-sm">
          <a className="hover:underline me-4" href="/how">Как это работает</a>
          <a className="hover:underline me-4" href="/security">Безопасность</a>
          <a className="hover:underline" href="/login">Вход</a>
        </nav>
      </div>
    </header>
  );
}

