import Link from "next/link";

export const dynamic = "force-static";

export const metadata = {
  title: "Послания, которые будут доставлены позже  ECHO",
  description:
    "Запишите текст, голос или видео. Мы доставим их адресатам в нужный день, даже после вашей смерти.",
};

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 hero-bg" />

      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1100px] flex-col items-center justify-center px-4 sm:px-6 text-center">
        <h1 className="hero-title nowrap">
          Послания, которые будут доставлены позже
        </h1>

        <p className="hero-subtitle nowrap">
          Текст, голос или видео. Доставка адресатам в выбранный день. Даже если вас уже нет.
        </p>

        <Link href="/messages/new" className="hero-cta">
          Оставить послание
        </Link>
      </section>

      <footer className="pointer-events-none absolute inset-x-0 bottom-6 z-10 text-center text-neutral-500">
         2025 ECHO
      </footer>
    </main>
  );
}
