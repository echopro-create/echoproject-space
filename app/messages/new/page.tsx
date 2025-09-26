'use client';

import { useState, useId } from 'react';
import Link from 'next/link';

type Mode = 'text' | 'audio' | 'video';

export default function NewMessagePage() {
  const [mode, setMode] = useState<Mode>('text');

  const titleId = useId();
  const msgId = useId();
  const dateId = useId();
  const timeId = useId();
  const recipientId = useId();
  const afterDeathId = useId();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('РЎРѕС…СЂР°РЅСЏРµРј С‡РµСЂРЅРѕРІРёРє РїРѕСЃР»Р°РЅРёСЏ (РїРѕРєР° Р±РµР· Р±СЌРєРµРЅРґР°).');
  };

  return (
    <main id="main" className="px-4 sm:px-6 lg:px-8 py-8">
      <nav className="mb-6 text-sm">
        <Link href="/" className="underline underline-offset-4 hover:opacity-70 transition">
          РќР° РіР»Р°РІРЅСѓСЋ
        </Link>
        <span className="mx-2 text-neutral-400">/</span>
        <span className="text-neutral-500">РќРѕРІРѕРµ РїРѕСЃР»Р°РЅРёРµ</span>
      </nav>

      <header className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">РќРѕРІРѕРµ РїРѕСЃР»Р°РЅРёРµ</h1>
        <p className="mt-2 text-neutral-600">
          РЎРѕР·РґР°Р№С‚Рµ С‚РµРєСЃС‚РѕРІРѕРµ, РіРѕР»РѕСЃРѕРІРѕРµ РёР»Рё РІРёРґРµРѕ-РїРѕСЃР»Р°РЅРёРµ, РєРѕС‚РѕСЂРѕРµ Р±СѓРґРµС‚ РґРѕСЃС‚Р°РІР»РµРЅРѕ РІ РЅСѓР¶РЅС‹Р№ РјРѕРјРµРЅС‚.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="mx-auto max-w-2xl">
        <div role="tablist" aria-label="Р¤РѕСЂРјР°С‚ РїРѕСЃР»Р°РЅРёСЏ" className="flex rounded-2xl border border-neutral-200 overflow-hidden mb-6">
          <TabButton active={mode === 'text'} onClick={() => setMode('text')} ariaControls="panel-text">
             РўРµРєСЃС‚
          </TabButton>
          <TabButton active={mode === 'audio'} onClick={() => setMode('audio')} ariaControls="panel-audio">
             РђСѓРґРёРѕ
          </TabButton>
          <TabButton active={mode === 'video'} onClick={() => setMode('video')} ariaControls="panel-video">
             Р’РёРґРµРѕ
          </TabButton>
        </div>

        <section className="rounded-3xl border border-neutral-200 bg-white shadow-sm">
          <div className="p-4 sm:p-6 border-b border-neutral-200">
            <label htmlFor={titleId} className="block text-sm font-medium mb-2">
              Р—Р°РіРѕР»РѕРІРѕРє (РЅРµРѕР±СЏР·Р°С‚РµР»СЊРЅРѕ)
            </label>
            <input
              id={titleId}
              name="title"
              type="text"
              placeholder="РќР°РїСЂРёРјРµСЂ: РџРёСЃСЊРјРѕ РґРµС‚СЏРј РІ 2035 РіРѕРґСѓ"
              className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition"
            />
          </div>

          <div className="p-4 sm:p-6">
            {mode === 'text' && (
              <div role="tabpanel" id="panel-text" aria-labelledby="tab-text">
                <label htmlFor={msgId} className="block text-sm font-medium mb-2">
                  РўРµРєСЃС‚ РїРѕСЃР»Р°РЅРёСЏ
                </label>
                <textarea
                  id={msgId}
                  name="message"
                  rows={10}
                  placeholder="РќР°РїРёС€РёС‚Рµ РІСЃС‘ РІР°Р¶РЅРѕРµ. Р­С‚Рѕ РѕСЃС‚Р°РЅРµС‚СЃСЏ Рё Р±СѓРґРµС‚ РґРѕСЃС‚Р°РІР»РµРЅРѕ С‚РµРј, РєС‚Рѕ РІР°Рј РґРѕСЂРѕРі."
                  className="w-full resize-y rounded-xl border border-neutral-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition"
                />
                <p className="mt-2 text-xs text-neutral-500">
                  РџРѕРґРґРµСЂР¶РєР° С„РѕСЂРјР°С‚РёСЂРѕРІР°РЅРёСЏ РїРѕСЏРІРёС‚СЃСЏ РїРѕР·Р¶Рµ. РЎРµР№С‡Р°СЃ  РѕР±С‹С‡РЅС‹Р№ С‚РµРєСЃС‚.
                </p>
              </div>
            )}

            {mode === 'audio' && (
              <div role="tabpanel" id="panel-audio" aria-labelledby="tab-audio">
                <MediaPlaceholder
                  title="РђСѓРґРёРѕ-РїРѕСЃР»Р°РЅРёРµ"
                  description="РЎРєРѕСЂРѕ РјРѕР¶РЅРѕ Р±СѓРґРµС‚ Р·Р°РїРёСЃР°С‚СЊ РіРѕР»РѕСЃ РїСЂСЏРјРѕ Р·РґРµСЃСЊ РёР»Рё Р·Р°РіСЂСѓР·РёС‚СЊ С„Р°Р№Р» (MP3/WAV/M4A)."
                  ctaPrimary="Р—Р°РїРёСЃР°С‚СЊ Р°СѓРґРёРѕ"
                  ctaSecondary="Р—Р°РіСЂСѓР·РёС‚СЊ С„Р°Р№Р»"
                />
              </div>
            )}

            {mode === 'video' && (
              <div role="tabpanel" id="panel-video" aria-labelledby="tab-video">
                <MediaPlaceholder
                  title="Р’РёРґРµРѕ-РїРѕСЃР»Р°РЅРёРµ"
                  description="РЎРєРѕСЂРѕ РјРѕР¶РЅРѕ Р±СѓРґРµС‚ Р·Р°РїРёСЃР°С‚СЊ РІРёРґРµРѕ СЃ РєР°РјРµСЂС‹ РёР»Рё Р·Р°РіСЂСѓР·РёС‚СЊ С„Р°Р№Р» (MP4/MOV/WEBM)."
                  ctaPrimary="Р—Р°РїРёСЃР°С‚СЊ РІРёРґРµРѕ"
                  ctaSecondary="Р—Р°РіСЂСѓР·РёС‚СЊ С„Р°Р№Р»"
                />
              </div>
            )}
          </div>

          <div className="p-4 sm:p-6 border-t border-neutral-200">
            <h2 className="text-base font-semibold mb-4">Р”РѕСЃС‚Р°РІРєР°</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor={dateId} className="block text-sm font-medium mb-2">
                  Р”Р°С‚Р°
                </label>
                <input
                  id={dateId}
                  name="send_date"
                  type="date"
                  className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition"
                />
              </div>

              <div>
                <label htmlFor={timeId} className="block text-sm font-medium mb-2">
                  Р’СЂРµРјСЏ
                </label>
                <input
                  id={timeId}
                  name="send_time"
                  type="time"
                  className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor={recipientId} className="block text-sm font-medium mb-2">
                  РџРѕР»СѓС‡Р°С‚РµР»СЊ
                </label>
                <input
                  id={recipientId}
                  name="recipient"
                  type="text"
                  placeholder="E-mail РїРѕР»СѓС‡Р°С‚РµР»СЏ РёР»Рё РІС‹Р±РµСЂРёС‚Рµ РёР· СЃРїРёСЃРєР° РїРѕР·Р¶Рµ"
                  className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition"
                />
                <p className="mt-2 text-xs text-neutral-500">
                  РЎРїРёСЃРѕРє РїРѕР»СѓС‡Р°С‚РµР»РµР№ РїРѕСЏРІРёС‚СЃСЏ РїРѕСЃР»Рµ РїРѕРґРєР»СЋС‡РµРЅРёСЏ Р±Р°Р·С‹. РЎРµР№С‡Р°СЃ РјРѕР¶РЅРѕ СѓРєР°Р·Р°С‚СЊ e-mail.
                </p>
              </div>

              <div className="sm:col-span-2 flex items-start gap-3">
                <input
                  id={afterDeathId}
                  name="after_death_only"
                  type="checkbox"
                  className="mt-1 size-5 rounded-md border-neutral-300 focus:ring-2 focus:ring-black/10 focus:border-black"
                />
                <div>
                  <label htmlFor={afterDeathId} className="text-sm font-medium">
                    РћС‚РїСЂР°РІРёС‚СЊ С‚РѕР»СЊРєРѕ РїРѕСЃР»Рµ РјРѕРµР№ СЃРјРµСЂС‚Рё
                  </label>
                  <p className="text-xs text-neutral-500">
                    Р¤СѓРЅРєС†РёСЏ Р±СѓРґРµС‚ Р°РєС‚РёРІРёСЂРѕРІР°РЅР° РїРѕСЃР»Рµ РїРѕРґРєР»СЋС‡РµРЅРёСЏ РїСѓР»СЊСЃР° (dead-man switch).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            type="submit"
            className="inline-flex justify-center items-center rounded-2xl border border-neutral-900 bg-neutral-900 text-white px-5 py-3 text-base font-medium hover:opacity-90 active:opacity-80 transition"
          >
            РЎРѕС…СЂР°РЅРёС‚СЊ РїРѕСЃР»Р°РЅРёРµ
          </button>

          <Link
            href="/messages"
            className="inline-flex justify-center items-center rounded-2xl border border-neutral-200 bg-white px-5 py-3 text-base font-medium hover:bg-neutral-50 transition"
          >
            РћС‚РјРµРЅРёС‚СЊ
          </Link>
        </div>

        <p className="mt-4 text-xs text-neutral-500">
          РђСѓРґРёРѕ Рё РІРёРґРµРѕ СЃРµР№С‡Р°СЃ РѕС‚РѕР±СЂР°Р¶Р°СЋС‚СЃСЏ РєР°Рє Р·Р°РіР»СѓС€РєРё  РёРЅС‚РµСЂС„РµР№СЃ СѓР¶Рµ РіРѕС‚РѕРІ, С„СѓРЅРєС†РёРѕРЅР°Р» РїРѕРґРєР»СЋС‡РёРј РїРѕР·Р¶Рµ.
        </p>
      </form>
    </main>
  );
}

function TabButton({
  active,
  onClick,
  ariaControls,
  children,
}: {
  active: boolean;
  onClick: () => void;
  ariaControls: string;
  children: React.ReactNode;
}) {
  return (
    <button
      role="tab"
      aria-selected={active}
      aria-controls={ariaControls}
      id={`tab-${String(children).split(' ')[0].toLowerCase()}`}
      type="button"
      onClick={onClick}
      className={[
        'w-1/3 px-4 py-3 text-sm sm:text-base font-medium transition',
        active
          ? 'bg-neutral-900 text-white'
          : 'bg-white text-neutral-600 hover:bg-neutral-50',
      ].join(' ')}
    >
      {children}
    </button>
  );
}

function MediaPlaceholder({
  title,
  description,
  ctaPrimary,
  ctaSecondary,
}: {
  title: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-neutral-300 p-6">
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-2 text-neutral-600">{description}</p>

      <div className="mt-4 flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          className="inline-flex justify-center items-center rounded-xl border border-neutral-900 bg-neutral-900 text-white px-4 py-2 text-sm font-medium hover:opacity-90 active:opacity-80 transition"
          onClick={() => alert('Р—Р°РїРёСЃСЊ Р±СѓРґРµС‚ РґРѕР±Р°РІР»РµРЅР° РїРѕР·Р¶Рµ.')}
        >
          {ctaPrimary}
        </button>
        <button
          type="button"
          className="inline-flex justify-center items-center rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium hover:bg-neutral-50 transition"
          onClick={() => alert('Р—Р°РіСЂСѓР·РєР° С„Р°Р№Р»Р° Р±СѓРґРµС‚ РґРѕР±Р°РІР»РµРЅР° РїРѕР·Р¶Рµ.')}
        >
          {ctaSecondary}
        </button>
      </div>

      <div className="mt-6 rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-500">
        РџСЂРµРґРїСЂРѕСЃРјРѕС‚СЂ РїРѕСЏРІРёС‚СЃСЏ Р·РґРµСЃСЊ РїРѕСЃР»Рµ Р·Р°РїРёСЃРё РёР»Рё Р·Р°РіСЂСѓР·РєРё С„Р°Р№Р»Р°.
      </div>
    </div>
  );
}
