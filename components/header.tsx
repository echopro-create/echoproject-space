import ThemeToggle from "./ui/theme-toggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/20 border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <a href="/" className="font-semibold tracking-tight">Echo</a>
        <nav className="flex items-center gap-3">
          <a href="#" className="text-sm text-neutral-300 hover:text-white">дея</a>
          <a href="#" className="text-sm text-neutral-300 hover:text-white">ак работает</a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
