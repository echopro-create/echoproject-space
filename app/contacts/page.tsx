'use client';
export default function ContactsPage() {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24 max-w-2xl">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">онтакты</h1>
      <p className="text-lg text-gray-700 mb-8">
        сть вопросы или предложения? апишите нам через форму.
      </p>
      <form className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">аше имя</label>
          <input id="name" type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">лектронная почта</label>
          <input id="email" type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black" />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">Сообщение</label>
          <textarea id="message" rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"></textarea>
        </div>
        <button type="submit" className="w-full py-3 px-6 rounded-full bg-gray-900 text-white font-semibold hover:bg-black transition-colors">тправить</button>
      </form>
    </section>
  );
}
