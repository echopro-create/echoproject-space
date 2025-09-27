import Link from "next/link";

export const dynamic = "force-static";

export const metadata = {
  title: "Послания, которые будут доставлены позже  ECHO",
  description:
    "Запишите текст, голосовое сообщение или видео. Мы доставим их адресатам в нужный день, даже после вашей смерти.",
};

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 hero-bg" />
      <section className="relative z-10 mx-auto flex min-h-screen max-w-[900px] flex-col items-center justify-center px-6 text-center">
        <h1 className="hero-title balance">
          Послания, которые будут доставлены позже
        </h1>

        <p className="hero-subtitle">
          Запишите текст, голосовое сообщение или видео. Мы доставим их адресатам
          в нужный день, даже после вашей смерти.
        </p>

        <Link
          href="/messages/new"
          className="mt-9 inline-flex items-center justify-center rounded-2xl px-6 py-3 text-base sm:text-lg font-medium bg-black text-white hover:opacity-90 active:opacity-80 transition"
        >
          Оставить послание
        </Link>
      </section>

      <footer className="pointer-events-none absolute inset-x-0 bottom-6 z-10 text-center text-neutral-500">
         2025 ECHO
      </footer>
    </main>
  );
}
