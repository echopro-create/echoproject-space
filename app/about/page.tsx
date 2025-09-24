'use client';
export default function AboutPage() {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">ќ проекте</h1>
      <p className="text-lg text-gray-700 mb-4">
        Echo Ч это сервис, который позвол€ет сохран€ть важные письма, фото и видео
        и доставл€ть их вашим близким в нужный момент: по дате или автоматически Ч
        когда вас не станет.
      </p>
      <p className="text-lg text-gray-700">
        ћы используем Supabase (≈—), строгие политики безопасности и шифрование,
        чтобы ваши послани€ были доступны только адресатам.
      </p>
    </section>
  );
}
