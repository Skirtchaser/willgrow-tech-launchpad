import { useEffect, useRef, useState, type FormEvent } from "react";
import { sendOffer } from "@/lib/offer.functions";

type Status = "idle" | "sending" | "sent" | "error";

export function OfferDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const openedAt = useRef(0);
  const [status, setStatus] = useState<Status>("idle");
  const [currency, setCurrency] = useState<"USDT" | "USDC" | "Other">("USDT");

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      openedAt.current = Date.now();
      setStatus((s) => (s === "error" ? "idle" : s));
      d.showModal();
    }
    if (!open && d.open) d.close();
  }, [open]);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setStatus("sending");
    try {
      await sendOffer({
        data: {
          amount: Number(f.get("amount")),
          currency,
          contact: String(f.get("contact") ?? ""),
          name: String(f.get("name") ?? ""),
          message: String(f.get("message") ?? ""),
          website: String(f.get("website") ?? ""),
          elapsed: Date.now() - openedAt.current,
        },
      });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <dialog
      ref={ref}
      className="wg-dialog"
      aria-labelledby="offer-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      <div className="wg-dialog-inner">
        <button type="button" className="wg-dialog-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        {status === "sent" ? (
          <div className="wg-sent" role="status">
            <h2 id="offer-title" className="wg-dialog-title">Offer sent</h2>
            <p>
              The owner reviews every offer personally and will reply to the contact you left,
              usually within a day.
            </p>
            <button type="button" className="wg-btn wg-btn-dark" onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate={false}>
            <h2 id="offer-title" className="wg-dialog-title">Make an offer for willgrow.tech</h2>
            <p className="wg-dialog-lede">
              Your offer goes straight to the owner. Settlement is in stablecoins, with escrow if you prefer.
            </p>

            <label className="wg-field">
              <span>Your offer, in US dollars</span>
              <div className="wg-amount">
                <span aria-hidden="true">$</span>
                <input name="amount" type="number" inputMode="numeric" min={1} step={1} required placeholder="1,000" />
              </div>
            </label>

            <fieldset className="wg-field">
              <legend>Pay in</legend>
              <div className="wg-segment">
                {(["USDT", "USDC", "Other"] as const).map((c) => (
                  <label key={c} className={currency === c ? "is-on" : undefined}>
                    <input
                      type="radio"
                      name="currency"
                      value={c}
                      checked={currency === c}
                      onChange={() => setCurrency(c)}
                    />
                    {c}
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="wg-field">
              <span>How to reach you</span>
              <input name="contact" required minLength={3} maxLength={200} placeholder="Telegram @username or email" />
            </label>

            <label className="wg-field">
              <span>
                Name or company <em>optional</em>
              </span>
              <input name="name" maxLength={120} autoComplete="organization" />
            </label>

            <label className="wg-field">
              <span>
                Message <em>optional</em>
              </span>
              <textarea name="message" rows={3} maxLength={1500} placeholder="What you plan to build, timing, questions" />
            </label>

            <input className="wg-hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />

            {status === "error" && (
              <p className="wg-error" role="alert">
                The offer wasn’t sent. Check your connection and send it again.
              </p>
            )}

            <button type="submit" className="wg-btn wg-btn-dark wg-btn-wide" disabled={status === "sending"}>
              {status === "sending" ? "Sending offer…" : "Send offer"}
            </button>
            <p className="wg-fineprint">Your details are used only to answer this offer.</p>
          </form>
        )}
      </div>
    </dialog>
  );
}
