import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Rosette, WaveBand } from "@/components/Guilloche";
import { OfferDialog } from "@/components/OfferDialog";

const TITLE = "willgrow.tech — a domain for companies built on growth";
const DESCRIPTION =
  "willgrow.tech is available. A short, brandable .tech name for fintech, venture, growth and education companies. Make an offer, settle in USDT or USDC.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

const REASONS = [
  {
    title: "Short and easy to say",
    text: "Two everyday English words, eight letters, no hyphens or numbers. People spell it right after hearing it once.",
  },
  {
    title: "A promise in the name",
    text: "“Will grow” speaks the language of results to customers, investors and teams before they read a single line.",
  },
  {
    title: "Signals technology",
    text: "The .tech ending tells visitors at a glance that there is a product behind the name.",
  },
  {
    title: "Ready to become a brand",
    text: "Works as a company name, an app name or a product line. Start using it the day the transfer completes.",
  },
];

const SECTORS = [
  { name: "Fintech and investing", use: "Savings apps, robo-advisors, wealth management. Your money will grow." },
  { name: "Venture and accelerators", use: "Funds, venture studios and founder programs that back what comes next." },
  { name: "Growth and marketing", use: "Growth agencies and analytics tools for revenue teams." },
  { name: "Education and coaching", use: "Courses, mentoring and platforms for building skills." },
  { name: "Careers and HR", use: "Talent development, career paths and performance tools." },
  { name: "AgriTech and climate", use: "Smart farming, plant care and sustainability projects." },
];

const STEPS = [
  { title: "Send an offer", text: "Use the offer form. The owner replies to the contact you leave." },
  { title: "Agree on terms", text: "Price, coin and network are confirmed in writing before any payment." },
  { title: "Pay in stablecoins", text: "USDT or USDC directly, or through an escrow agent both sides trust." },
  { title: "Receive the domain", text: "Once payment is confirmed on-chain, the domain moves to you, usually within 24 hours." },
];

const FAQ = [
  { q: "Is there a fixed price?", a: "No. Every serious offer is reviewed and answered." },
  { q: "Which coins do you accept?", a: "USDT and USDC. The network is agreed before payment." },
  { q: "Can we use escrow?", a: "Yes. An escrow agent trusted by both sides is welcome." },
  {
    q: "How is the domain transferred?",
    a: "By a push to your account at the same registrar, or with an authorization code so you can move it to your own registrar.",
  },
  {
    q: "What exactly is included?",
    a: "Full ownership of the domain name willgrow.tech. No website, content or trademark comes with it.",
  },
];

function Index() {
  const [open, setOpen] = useState(false);
  const offer = () => setOpen(true);

  return (
    <div className="wg">
      <header className="wg-top">
        <span className="wg-wordmark">willgrow.tech</span>
        <button type="button" className="wg-link-btn" onClick={offer}>
          Make an offer
        </button>
      </header>

      <section className="wg-hero">
        <div className="wg-cert">
          <WaveBand className="wg-band" />
          <div className="wg-cert-body">
            <div className="wg-cert-text">
              <p className="wg-cert-kicker">Certificate of title</p>
              <h1 className="wg-domain">
                willgrow<span>.tech</span>
              </h1>
              <p className="wg-cert-line">
                One domain name, offered in full to its next owner.
              </p>
              <dl className="wg-cert-meta">
                <div>
                  <dt>Status</dt>
                  <dd>Available</dd>
                </div>
                <div>
                  <dt>Settlement</dt>
                  <dd>USDT or USDC</dd>
                </div>
                <div>
                  <dt>Transfer</dt>
                  <dd>Within 24 hours</dd>
                </div>
              </dl>
            </div>
            <Rosette className="wg-seal" />
          </div>
          <WaveBand className="wg-band" />
        </div>

        <div className="wg-hero-copy">
          <p className="wg-hero-lede">
            A name for companies built to compound. Short, plain English, and a promise customers
            understand at once.
          </p>
          <button type="button" className="wg-btn wg-btn-brass" onClick={offer}>
            Make an offer
          </button>
        </div>
      </section>

      <main>
        <section className="wg-section" aria-labelledby="why">
          <h2 id="why" className="wg-h2">Why this name</h2>
          <div className="wg-reasons">
            {REASONS.map((r) => (
              <article key={r.title} className="wg-reason">
                <h3>{r.title}</h3>
                <p>{r.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="wg-section" aria-labelledby="who">
          <h2 id="who" className="wg-h2">Who it suits</h2>
          <p className="wg-section-lede">
            Anyone whose product makes something bigger over time: capital, skills, audiences or crops.
          </p>
          <dl className="wg-ledger">
            {SECTORS.map((s) => (
              <div key={s.name} className="wg-ledger-row">
                <dt>{s.name}</dt>
                <dd>{s.use}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="wg-section" aria-labelledby="how">
          <h2 id="how" className="wg-h2">How the sale works</h2>
          <ol className="wg-steps">
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <span className="wg-step-n" aria-hidden="true">
                  {["I", "II", "III", "IV"][i]}
                </span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="wg-section wg-faq" aria-labelledby="faq">
          <h2 id="faq" className="wg-h2">Questions</h2>
          <div>
            {FAQ.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <section className="wg-closing">
        <Rosette size={120} className="wg-closing-seal" />
        <h2>Make willgrow.tech yours</h2>
        <p>Offers go directly to the owner and are answered personally.</p>
        <button type="button" className="wg-btn wg-btn-brass" onClick={offer}>
          Make an offer
        </button>
      </section>

      <footer className="wg-foot">© {new Date().getFullYear()} willgrow.tech. This domain is offered for sale.</footer>

      <OfferDialog open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
