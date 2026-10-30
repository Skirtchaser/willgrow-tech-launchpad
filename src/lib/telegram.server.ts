// Server-only helper for calling the Telegram Bot API (@JRBelfort_bot, id 8620564840)
// through the Lovable connector gateway. The bot token is injected by the gateway.
const GATEWAY_URL = "https://connector-gateway.lovable.dev/telegram";

export async function telegram<T = unknown>(method: string, body: Record<string, unknown> = {}): Promise<T> {
  const lovableKey = process.env["LOVABLE_API_KEY"];
  const telegramKey = process.env["TELEGRAM_API_KEY"];
  if (!lovableKey) throw new Error("LOVABLE_API_KEY is not configured");
  if (!telegramKey) throw new Error("TELEGRAM_API_KEY is not configured");

  const res = await fetch(`${GATEWAY_URL}/${method}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": telegramKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`Telegram ${method} failed [${res.status}]: ${text}`);
  const data = JSON.parse(text);
  if (!data.ok) throw new Error(`Telegram ${method} error: ${text}`);
  return data.result as T;
}
