'use client';
export default function AboutPage() {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">О проекте</h1>
      <p className="text-lg text-gray-700 mb-4">
        Echo — это сервис, который позволяет сохранять важные письма, фото и видео
        и доставлять их вашим близким в нужный момент: по дате или автоматически —
        когда вас не станет.
      </p>
      <p className="text-lg text-gray-700">
        Мы используем Supabase (ЕС), строгие политики безопасности и шифрование,
        чтобы ваши послания были доступны только адресатам.
      </p>
    </section>
  );
}
