import ScrollProgressBar from "@/app/components/UX/ScrollProgressBar";

export default function StaticPage({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <ScrollProgressBar />
      <article className="mx-auto w-full max-w-[720px] px-[var(--gutter-mobile)] lg:px-[var(--gutter-desktop)] py-[var(--spacing-lg)] prose prose-neutral prose-headings:font-medium prose-p:leading-relaxed">
        <h1 className="!mb-[var(--spacing-md)]">{title}</h1>
        <div className="text-[var(--colors-muted)] !mt-[-8px] !mb-[var(--spacing-lg)] text-sm">
          Обновлено: {new Date().toLocaleDateString("ru-RU")}
        </div>
        <div className="[&_*]:text-[var(--colors-text)] [&_a]:text-[var(--colors-primary)] [&_a:hover]:opacity-80">
          {children}
        </div>
      </article>
    </>
  );
}