import type { Metadata } from 'next';
import './globals.css';
import '../styles/styles.css';
import { ReactNode } from 'react';

import { Footer } from './sections/Footer';
import { Header } from './sections/Header';

export const metadata: Metadata = {
  title: 'ECHO вЂ” РџРѕСЃР»Р°РЅРёСЏ РІ Р±СѓРґСѓС‰РµРµ',
  description: 'РџРѕСЃР»Р°РЅРёСЏ РїРѕСЃР»Рµ Р¶РёР·РЅРё, РєРѕРіРґР° СЃР»РѕРІР° РїРѕ-РЅР°СЃС‚РѕСЏС‰РµРјСѓ РЅСѓР¶РЅС‹.',
  metadataBase: new URL('https://echoproject.space')
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body className="min-h-dvh bg-white text-neutral-900 antialiased">
        <a href="#main" className="sr-only focus:not-sr-only">РџСЂРѕРїСѓСЃС‚РёС‚СЊ Рє СЃРѕРґРµСЂР¶РёРјРѕРјСѓ</a>
        <Header />
        <main id="main" className="container mx-auto px-4 py-8 lg:px-6">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="max-w-prose lg:col-span-8">{children}</div>
            <aside className="space-y-6 lg:col-span-4">
              <div className="rounded-xl border border-neutral-200 p-4">
                <p className="text-sm text-neutral-600">РЎР°Р№РґР±Р°СЂ-Р·Р°РіР»СѓС€РєР°. РЎС‚Р°Р±РёР»СЊРЅР°СЏ РІС‹СЃРѕС‚Р°.</p>
              </div>
            </aside>
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}

