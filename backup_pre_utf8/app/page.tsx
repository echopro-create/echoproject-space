export const metadata = {
  title: "ECHO — послания после жизни",
  description:
    "апишите важные слова и отправьте их автоматически тогда, когда это действительно нужно.",
  openGraph: {
    title: "ECHO",
    description:
      "апишите важные слова и отправьте их автоматически тогда, когда это действительно нужно.",
    type: "website",
    locale: "ru_RU",
    url: "https://www.echoproject.space",
  },
};

export default function Home() {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24 text-center">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-4"> ослания после жизни, когда слова по-настоящему нужны
      </h1>
      <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
        ECHO — это сервис, который отправит ваши важные слова тогда, когда это действительно нужно:
        по дате, событиям или после ухода. сё бережно и безопасно.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <a href="/messages/new" className="px-8 py-3 bg-black text-white rounded-full font-bold shadow-md hover:bg-gray-800 transition-colors">
          Создать послание
        </a>
        <a href="/about" className="px-8 py-3 border border-gray-300 text-gray-900 rounded-full font-bold hover:bg-gray-100 transition-colors"> ак это работает
        </a>
      </div>
    </section>
  );
}



