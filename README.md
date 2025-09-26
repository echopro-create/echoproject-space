# ECHO — чистый старт (Next.js 15, TypeScript, Tailwind, RU-only, light-only)

## Установка
```powershell
npm i
```

## Запуск
```powershell
npm run dev        # генерирует токены и стартует dev
npm run dev:watch  # вотчер токенов + dev
```

## Билд
```powershell
npm run build
npm start
```

## Фиксы внутри
- Нет `postcss.config.js`, только `postcss.config.cjs` (ESM-совместимо).
- `/app/messages/new/page.tsx` — серверная страница с `metadata`.
- Клиентская логика вынесена в `ClientNewMessage.tsx`.
- Все файлы UTF-8 без BOM.
