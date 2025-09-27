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

      <Link
        href="/messages/new"
        className="mt-10 inline-flex items-center justify-center rounded-2xl px-8 py-3 text-lg font-medium bg-black text-white hover:opacity-90 active:opacity-80 transition"
      >
        Оставить послание
      </Link>

      <footer className="pointer-events-none footer-fixed inset-x-0 bottom-4 z-10 text-center text-neutral-500 text-sm mt-16">
         2025 ECHO
      </footer>
    </main>
  );
}
