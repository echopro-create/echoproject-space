# ECHO — минимальный рабочий сайт (Next.js 15 + Supabase)

## Быстрый старт
```bash
npm i
npm run dev
```

## Окружение (`.env.local`)
```
NEXT_PUBLIC_SUPABASE_URL=https://uyoyqmxpbfaprksmlcgq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=REPLACE_WITH_YOURS
# На сервере добавь SUPABASE_SERVICE_KEY (если понадобится фоновая обработка)
```

## Миграции БД (Supabase)
Выполни `supabase/schema.sql` через Supabase SQL Editor.

## Что внутри
- DRY-компоненты: Header, Footer
- Глобальная защита «первой буквы» в `app/globals.css`
- Строгая схема + RLS по пользователю
- API `/api/messages` с валидацией (zod) и простым rate-limit
- `/messages` — живые данные (серверный компонент)
- `/messages/new` — форма, honeypot, конвертация дат в UTC

## Безопасность
CSP и защитные заголовки — в `middleware.ts`. Rate-limit в API (демо).

## Заметки
- Клиентская анонимная сессия Supabase должна быть создана до чтения/записи.
- Для продакшена добавь Sentry, CI, и очереди доставок (Supabase Edge Functions/cron).
