export const dynamic = 'force-static';
export const metadata = { title: 'О проекте — ECHO' };

export default function AboutPage() {
  return (
    <article className="mx-auto">
      <h1 className="mb-4 text-2xl font-semibold tracking-tight md:text-3xl">О проекте</h1>
      <p className="leading-relaxed text-neutral-700">
        Минимальный стартовый шаблон без функционала. Дальше поверх него добавляются реальные фичи.
      </p>
    </article>
  );
}
