export const metadata = {
  title: "ECHO — Послания после жизни",
  description:
    "Запишите важные слова и отправьте их автоматически тогда, когда это действительно нужно.",
  openGraph: {
    title: "ECHO",
    description:
      "Запишите важные слова и отправьте их автоматически тогда, когда это действительно нужно.",
    type: "website",
    locale: "ru_RU",
    url: "https://www.echoproject.space",
  },
};
export default function Home() {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24 text-center">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-4">
        Р СџР С•РЎРѓР В»Р В°Р Р…Р С‘РЎРЏ, Р С”Р С•РЎвЂљР С•РЎР‚РЎвЂ№Р Вµ Р С—Р ВµРЎР‚Р ВµР В¶Р С‘Р Р†РЎС“РЎвЂљ Р Р†Р В°РЎРѓ
      </h1>
      <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
        ECHO РІР‚вЂќ Р Р…Р В°Р Т‘РЎвЂР В¶Р Р…РЎвЂ№Р в„– РЎРѓР ВµРЎР‚Р Р†Р С‘РЎРѓ Р Т‘Р В»РЎРЏ РЎРѓР С•РЎвЂ¦РЎР‚Р В°Р Р…Р ВµР Р…Р С‘РЎРЏ Р С‘ Р Т‘Р С•РЎРѓРЎвЂљР В°Р Р†Р С”Р С‘ Р Р†Р В°Р В¶Р Р…РЎвЂ№РЎвЂ¦ Р С—Р С‘РЎРѓР ВµР С Р Р†Р В°РЎв‚¬Р С‘Р С Р В±Р В»Р С‘Р В·Р С”Р С‘Р С, Р С”Р С•Р С–Р Т‘Р В° Р С—РЎР‚Р С‘Р Т‘РЎвЂРЎвЂљ Р Р†РЎР‚Р ВµР СРЎРЏ.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <a href="/messages/new" className="px-8 py-3 bg-black text-white rounded-full font-bold shadow-md hover:bg-gray-800 transition-colors">
          Р СњР В°Р С—Р С‘РЎРѓР В°РЎвЂљРЎРЉ Р С—Р С•РЎРѓР В»Р В°Р Р…Р С‘Р Вµ
        </a>
        <a href="/about" className="px-8 py-3 border border-gray-300 text-gray-900 rounded-full font-bold hover:bg-gray-100 transition-colors">
          Р Р€Р В·Р Р…Р В°РЎвЂљРЎРЉ Р В±Р С•Р В»РЎРЉРЎв‚¬Р Вµ
        </a>
      </div>
    </section>
  );
}
