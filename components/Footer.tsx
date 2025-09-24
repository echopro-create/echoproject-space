'use client';
export default function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-600">
      <div className="container mx-auto px-4 py-8 md:flex md:justify-between md:items-center text-center">
        <div className="text-sm">В© 2025 ECHO. Р’СЃРµ РїСЂР°РІР° Р·Р°С‰РёС‰РµРЅС‹.</div>
        <div className="flex justify-center space-x-6 mt-4 md:mt-0">
          <a href="/policy" className="hover:text-black transition-colors duration-200">РџРѕР»РёС‚РёРєР° РєРѕРЅС„РёРґРµРЅС†РёР°Р»СЊРЅРѕСЃС‚Рё</a>
          <a href="/terms" className="hover:text-black transition-colors duration-200">РџРѕР»СЊР·РѕРІР°С‚РµР»СЊСЃРєРѕРµ СЃРѕРіР»Р°С€РµРЅРёРµ</a>
        </div>
      </div>
    </footer>
  );
}




