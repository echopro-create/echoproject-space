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
    alert('Сохраняем черновик послания (пока без бэкенда).');
  };

  return (
    <main id="main" className="px-4 sm:px-6 lg:px-8 py-8">
      <nav className="mb-6 text-sm">
        <Link href="/" className="underline underline-offset-4 hover:opacity-70 transition">
          На главную
        </Link>
        <span className="mx-2 text-neutral-400">/</span>
        <span className="text-neutral-500">Новое послание</span>
      </nav>

      <header className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Новое послание</h1>
        <p className="mt-2 text-neutral-600">
          Создайте текстовое, голосовое или видео-послание, которое будет доставлено в нужный момент.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="mx-auto max-w-2xl">
        <div role="tablist" aria-label="Формат послания" className="flex rounded-2xl border border-neutral-200 overflow-hidden mb-6">
          <TabButton active={mode === 'text'} onClick={() => setMode('text')} ariaControls="panel-text">
             Текст
          </TabButton>
          <TabButton active={mode === 'audio'} onClick={() => setMode('audio')} ariaControls="panel-audio">
             Аудио
          </TabButton>
          <TabButton active={mode === 'video'} onClick={() => setMode('video')} ariaControls="panel-video">
             Видео
          </TabButton>
        </div>

        <section className="rounded-3xl border border-neutral-200 bg-white shadow-sm">
          <div className="p-4 sm:p-6 border-b border-neutral-200">
            <label htmlFor={titleId} className="block text-sm font-medium mb-2">
              Заголовок (необязательно)
            </label>
            <input
              id={titleId}
              name="title"
              type="text"
              placeholder="Например: Письмо детям в 2035 году"
              className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition"
            />
          </div>

          <div className="p-4 sm:p-6">
            {mode === 'text' && (
              <div role="tabpanel" id="panel-text" aria-labelledby="tab-text">
                <label htmlFor={msgId} className="block text-sm font-medium mb-2">
                  Текст послания
                </label>
                <textarea
                  id={msgId}
                  name="message"
                  rows={10}
                  placeholder="Напишите всё важное. Это останется и будет доставлено тем, кто вам дорог."
                  className="w-full resize-y rounded-xl border border-neutral-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition"
                />
                <p className="mt-2 text-xs text-neutral-500">
                  Поддержка форматирования появится позже. Сейчас  обычный текст.
                </p>
              </div>
            )}

            {mode === 'audio' && (
              <div role="tabpanel" id="panel-audio" aria-labelledby="tab-audio">
                <MediaPlaceholder
                  title="Аудио-послание"
                  description="Скоро можно будет записать голос прямо здесь или загрузить файл (MP3/WAV/M4A)."
                  ctaPrimary="Записать аудио"
                  ctaSecondary="Загрузить файл"
                />
              </div>
            )}

            {mode === 'video' && (
              <div role="tabpanel" id="panel-video" aria-labelledby="tab-video">
                <MediaPlaceholder
                  title="Видео-послание"
                  description="Скоро можно будет записать видео с камеры или загрузить файл (MP4/MOV/WEBM)."
                  ctaPrimary="Записать видео"
                  ctaSecondary="Загрузить файл"
                />
              </div>
            )}
          </div>

          <div className="p-4 sm:p-6 border-t border-neutral-200">
            <h2 className="text-base font-semibold mb-4">Доставка</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor={dateId} className="block text-sm font-medium mb-2">
                  Дата
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
                  Время
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
                  Получатель
                </label>
                <input
                  id={recipientId}
                  name="recipient"
                  type="text"
                  placeholder="E-mail получателя или выберите из списка позже"
                  className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition"
                />
                <p className="mt-2 text-xs text-neutral-500">
                  Список получателей появится после подключения базы. Сейчас можно указать e-mail.
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
                    Отправить только после моей смерти
                  </label>
                  <p className="text-xs text-neutral-500">
                    Функция будет активирована после подключения пульса (dead-man switch).
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
            Сохранить послание
          </button>

          <Link
            href="/messages"
            className="inline-flex justify-center items-center rounded-2xl border border-neutral-200 bg-white px-5 py-3 text-base font-medium hover:bg-neutral-50 transition"
          >
            Отменить
          </Link>
        </div>

        <p className="mt-4 text-xs text-neutral-500">
          Аудио и видео сейчас отображаются как заглушки  интерфейс уже готов, функционал подключим позже.
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
          onClick={() => alert('Запись будет добавлена позже.')}
        >
          {ctaPrimary}
        </button>
        <button
          type="button"
          className="inline-flex justify-center items-center rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium hover:bg-neutral-50 transition"
          onClick={() => alert('Загрузка файла будет добавлена позже.')}
        >
          {ctaSecondary}
        </button>
      </div>

      <div className="mt-6 rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-500">
        Предпросмотр появится здесь после записи или загрузки файла.
      </div>
    </div>
  );
}