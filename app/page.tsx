import Link from "next/link";

export const dynamic = "force-static";

export const metadata = {
  title: "Послания, которые будут доставлены позже  ECHO",
  description:
    "Мы сохраним ваши слова и доставим их туда, куда вы уже не сможете.",
};

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Фон-перо */}
      <div aria-hidden className="absolute inset-0 bg-hero-feather opacity-20" />

      {/* Контент */}
      <section className="relative z-10 mx-auto flex min-h-screen max-w-[900px] flex-col items-center justify-center px-6 text-center">
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
      </section>

      {/* Футер */}
      <footer className="pointer-events-none footer-fixed inset-x-0 bottom-4 z-10 text-center text-neutral-500 text-sm">
         2025 ECHO
      </footer>
    </main>
  );
}
