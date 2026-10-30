import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// Offer submitted from the landing page. Delivered to the owner's Telegram chat.
export const offerSchema = z.object({
  amount: z.coerce.number().min(1).max(100_000_000),
  currency: z.enum(["USDT", "USDC", "Other"]),
  contact: z.string().trim().min(3).max(200),
  name: z.string().trim().max(120).optional().default(""),
  message: z.string().trim().max(1500).optional().default(""),
  // Honeypot: real visitors never see or fill this field.
  website: z.string().max(200).optional().default(""),
  // Milliseconds the form was open before sending; very fast submits are bots.
  elapsed: z.coerce.number().optional().default(0),
});

export type OfferInput = z.input<typeof offerSchema>;

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const sendOffer = createServerFn({ method: "POST" })
  .inputValidator((data: OfferInput) => offerSchema.parse(data))
  .handler(async ({ data }) => {
    // Silently accept bot submissions without forwarding them.
    if (data.website || data.elapsed < 2500) return { ok: true as const };

    const chatId = process.env["TELEGRAM_CHAT_ID"];
    if (!chatId) throw new Error("TELEGRAM_CHAT_ID is not configured");

    const amount = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(data.amount);

    const lines = [
      "<b>New offer for willgrow.tech</b>",
      "",
      "<b>Offer:</b> " + escapeHtml(amount) + " in " + escapeHtml(data.currency),
      "<b>Contact:</b> " + escapeHtml(data.contact),
      data.name ? "<b>Name:</b> " + escapeHtml(data.name) : null,
      data.message ? "<b>Message:</b>" : null,
      data.message ? escapeHtml(data.message) : null,
      "",
      "<i>" + new Date().toISOString().replace("T", " ").slice(0, 16) + " UTC</i>",
    ].filter((l): l is string => l !== null);

    const { telegram } = await import("./telegram.server");
    await telegram("sendMessage", {
      chat_id: chatId,
      text: lines.join(String.fromCharCode(10)),
      parse_mode: "HTML",
      disable_web_page_preview: true,
    });

    return { ok: true as const };
  });
