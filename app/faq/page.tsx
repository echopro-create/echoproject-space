'use client';
export default function FaqPage() {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">опросы и ответы</h1>
      <div className="space-y-6 text-lg text-gray-700">
        <div>
          <h2 className="font-semibold">то такое Echo?</h2>
          <p>Echo — это сервис для хранения и доставки ваших посланий близким в будущем.</p>
        </div>
        <div>
          <h2 className="font-semibold">асколько мои данные безопасны?</h2>
          <p>ы используем шифрование, хранение в С и строгие политики Supabase RLS.</p>
        </div>
        <div>
          <h2 className="font-semibold">ожно ли изменить или удалить послание?</h2>
          <p>а, пока оно не доставлено — вы полностью управляете своими данными.</p>
        </div>
      </div>
    </section>
  );
}
