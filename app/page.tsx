import Link from "next/link";

export const dynamic = "force-static";

export const metadata = {
  title: "Послания, которые будут доставлены позже  ECHO",
  description:
    "Мы сохраним ваши слова и доставим их туда, куда вы уже не сможете.",
};

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-white flex flex-col items-center justify-center text-center px-6">
      <h1 className="hero-title">
        Послания, которые будут доставлены позже
      </h1>

      <p className="hero-subtitle mt-4">
        Мы сохраним ваши слова и доставим их туда, куда вы уже не сможете.
      </p>

      <div className="hero-steps mt-10 space-y-4">
        <Link href="/messages/new" className="hero-step">
          1. Создать своё послание
        </Link>
        <Link href="/messages/new?type=video" className="hero-step">
          2. Записать видео для будущего
        </Link>
        <Link href="/messages/new?start=true" className="hero-step">
          3. Начать
        </Link>
      </div>

      <footer className="pointer-events-none footer-fixed inset-x-0 bottom-4 z-10 text-center text-neutral-500 text-sm mt-16">
         2025 ECHO
      </footer>
    </main>
  );
}
