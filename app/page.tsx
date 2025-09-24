export default function Home() {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24 text-center">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-4">
        РџРѕСЃР»Р°РЅРёСЏ, РєРѕС‚РѕСЂС‹Рµ РїРµСЂРµР¶РёРІСѓС‚ РІР°СЃ
      </h1>
      <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
        ECHO вЂ” РЅР°РґС‘Р¶РЅС‹Р№ СЃРµСЂРІРёСЃ РґР»СЏ СЃРѕС…СЂР°РЅРµРЅРёСЏ Рё РґРѕСЃС‚Р°РІРєРё РІР°Р¶РЅС‹С… РїРёСЃРµРј РІР°С€РёРј Р±Р»РёР·РєРёРј, РєРѕРіРґР° РїСЂРёРґС‘С‚ РІСЂРµРјСЏ.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <a href="/messages/new" className="px-8 py-3 bg-black text-white rounded-full font-bold shadow-md hover:bg-gray-800 transition-colors">
          РќР°РїРёСЃР°С‚СЊ РїРѕСЃР»Р°РЅРёРµ
        </a>
        <a href="/about" className="px-8 py-3 border border-gray-300 text-gray-900 rounded-full font-bold hover:bg-gray-100 transition-colors">
          РЈР·РЅР°С‚СЊ Р±РѕР»СЊС€Рµ
        </a>
      </div>
    </section>
  );
}
