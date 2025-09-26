import ScrollProgressBar from "@/app/components/UX/ScrollProgressBar";
export default function StaticPage({ title, children }:{ title:string; children:React.ReactNode; }){
  return (
    <>
      <ScrollProgressBar />
      <article className="mx-auto w-full max-w-[750px] px-md lg:px-lg py-lg prose prose-neutral prose-headings:font-medium prose-p:leading-relaxed">
        <h1 className="!mb-md">{title}</h1>
        <div className="text-muted !mt-[-8px] !mb-lg text-sm">
          Обновлено: {new Date().toLocaleDateString("ru-RU")}
        </div>
        <div className="[&_*]:text-text [&_a]:text-primary [&_a:hover]:opacity-80">
          {children}
        </div>
      </article>
    </>
  );
}
