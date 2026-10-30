# Willgrow.Tech for sale

Каркас на TanStack Start (React 19, Vite, Tailwind v4).

## Структура
- `src/routes/` — страницы (файловый роутинг)
- `src/lib/telegram.server.ts` — серверный хелпер `telegram(method, body)` для Telegram Bot API

## Telegram
Бот: @JRBelfort_bot (id 8620564840), подключён через коннектор Lovable.
Секреты (только сервер): `LOVABLE_API_KEY`, `TELEGRAM_API_KEY`. Токен бота в коде не нужен.

Пример (внутри `createServerFn`):
```ts
import { telegram } from "@/lib/telegram.server";
await telegram("sendMessage", { chat_id: 123, text: "Привет" });
```

Приём сообщений: webhook на `src/routes/api/public/telegram/webhook.ts` + `setWebhook` (пока не настроен).
