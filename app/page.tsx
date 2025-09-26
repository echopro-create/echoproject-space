export const dynamic = "force-static";
import Link from "next/link";
export default function HomePage() {
  return (
    <section className="container py-16">
      <h1 className="text-4xl md:text-5xl font-semibold leading-tight max-w-2xl">
        Послания, которые переживут календарь
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        Запишите текст, голос или видео. Мы доставим их адресатам в нужный день, даже если вас уже нельзя набрать.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/messages/new" className="px-5 py-3 rounded-2xl bg-black text-white">Оставить послание</Link>
        <Link href="/how" className="px-5 py-3 rounded-2xl border border-border">Как это работает</Link>
      </div>
    </section>
  );
}
