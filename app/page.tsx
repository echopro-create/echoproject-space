export const metadata = {
  title: "ECHO вЂ” РїРѕСЃР»Р°РЅРёСЏ РїРѕСЃР»Рµ Р¶РёР·РЅРё",
  description:
    "Р°РїРёС€РёС‚Рµ РІР°Р¶РЅС‹Рµ СЃР»РѕРІР° Рё РѕС‚РїСЂР°РІСЊС‚Рµ РёС… Р°РІС‚РѕРјР°С‚РёС‡РµСЃРєРё С‚РѕРіРґР°, РєРѕРіРґР° СЌС‚Рѕ РґРµР№СЃС‚РІРёС‚РµР»СЊРЅРѕ РЅСѓР¶РЅРѕ.",
  openGraph: {
    title: "ECHO",
    description:
      "Р°РїРёС€РёС‚Рµ РІР°Р¶РЅС‹Рµ СЃР»РѕРІР° Рё РѕС‚РїСЂР°РІСЊС‚Рµ РёС… Р°РІС‚РѕРјР°С‚РёС‡РµСЃРєРё С‚РѕРіРґР°, РєРѕРіРґР° СЌС‚Рѕ РґРµР№СЃС‚РІРёС‚РµР»СЊРЅРѕ РЅСѓР¶РЅРѕ.",
    type: "website",
    locale: "ru_RU",
    url: "https://www.echoproject.space",
  },
};

export default function Home() {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24 text-center">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-4">
        РѕСЃР»Р°РЅРёСЏ РїРѕСЃР»Рµ Р¶РёР·РЅРё, РєРѕРіРґР° СЃР»РѕРІР° РїРѕ-РЅР°СЃС‚РѕСЏС‰РµРјСѓ РЅСѓР¶РЅС‹
      </h1>
      <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
        ECHO вЂ” СЌС‚Рѕ СЃРµСЂРІРёСЃ, РєРѕС‚РѕСЂС‹Р№ РѕС‚РїСЂР°РІРёС‚ РІР°С€Рё РІР°Р¶РЅС‹Рµ СЃР»РѕРІР° С‚РѕРіРґР°, РєРѕРіРґР° СЌС‚Рѕ РґРµР№СЃС‚РІРёС‚РµР»СЊРЅРѕ РЅСѓР¶РЅРѕ:
        РїРѕ РґР°С‚Рµ, СЃРѕР±С‹С‚РёСЏРј РёР»Рё РїРѕСЃР»Рµ СѓС…РѕРґР°. СЃС‘ Р±РµСЂРµР¶РЅРѕ Рё Р±РµР·РѕРїР°СЃРЅРѕ.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <a href="/messages/new" className="px-8 py-3 bg-black text-white rounded-full font-bold shadow-md hover:bg-gray-800 transition-colors">
          РЎРѕР·РґР°С‚СЊ РїРѕСЃР»Р°РЅРёРµ
        </a>
        <a href="/about" className="px-8 py-3 border border-gray-300 text-gray-900 rounded-full font-bold hover:bg-gray-100 transition-colors">
          Р°Рє СЌС‚Рѕ СЂР°Р±РѕС‚Р°РµС‚
        </a>
      </div>
    </section>
  );
}



