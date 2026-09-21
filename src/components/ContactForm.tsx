"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MaskLines, Reveal } from "./motion-primitives";

const EASE = [0.22, 1, 0.36, 1] as const;

type Status = "idle" | "sending" | "sent";

/**
 * There is no backend wired up yet, so the form validates, then hands the
 * enquiry to the user's mail client rather than pretending to submit.
 * Swap `handoff()` for a POST when the endpoint exists.
 */
export default function ContactForm({ verticals }: { verticals: string[] }) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");

    const body = [
      `Name: ${data.get("name")}`,
      `Organisation: ${data.get("org")}`,
      `Email: ${data.get("email")}`,
      `Phone: ${data.get("phone") || "—"}`,
      `Vertical: ${data.get("vertical")}`,
      `Cohort size: ${data.get("size") || "—"}`,
      "",
      String(data.get("message") ?? ""),
    ].join("\n");

    const href = `mailto:connect@yandnow.com?subject=${encodeURIComponent(
      `Programme enquiry — ${data.get("org") || data.get("name")}`,
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = href;
    setStatus("sent");
    form.reset();
  }

  return (
    <div>
      <Reveal>
        <p className="eyebrow text-indigo-brand">Programme enquiry</p>
      </Reveal>
      <MaskLines
        as="h2"
        className="display-md mt-6 max-w-[20ch] font-semibold"
        lines={["Six fields.", "Then a real reply."]}
      />

      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mt-12 border border-line bg-paper p-8"
          >
            <p className="font-display text-[1.375rem] font-semibold tracking-[-0.03em]">
              Your mail client should be open.
            </p>
            <p className="mt-3 max-w-[46ch] text-[1.0625rem] leading-relaxed text-ink-70">
              Send the draft and we will come back within two working days. If nothing
              opened, write to{" "}
              <a
                href="mailto:connect@yandnow.com"
                className="font-medium text-indigo-brand underline decoration-1 underline-offset-[4px]"
              >
                connect@yandnow.com
              </a>{" "}
              directly.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-7 text-[0.9375rem] font-medium text-ink underline decoration-line decoration-1 underline-offset-[5px] transition-colors hover:text-indigo-brand"
            >
              Send another enquiry
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="mt-12 grid gap-x-6 gap-y-7 sm:grid-cols-2"
          >
            <Field name="name" label="Your name" required autoComplete="name" />
            <Field name="org" label="Organisation" required autoComplete="organization" />
            <Field name="email" label="Email" type="email" required autoComplete="email" />
            <Field name="phone" label="Phone" type="tel" autoComplete="tel" />

            <Select name="vertical" label="Which vertical" options={verticals} />
            <Field name="size" label="Approximate cohort size" type="text" />

            <div className="sm:col-span-2">
              <Field
                name="message"
                label="What do you need delivered?"
                textarea
                required
              />
            </div>

            <div className="sm:col-span-2 flex flex-wrap items-center gap-6">
              <button
                type="submit"
                disabled={status === "sending"}
                className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 font-medium text-paper-warm transition-colors duration-300 hover:bg-indigo-brand disabled:opacity-60"
              >
                {status === "sending" ? "Preparing…" : "Send enquiry"}
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden
                  className="transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
                >
                  <path
                    d="M2 7h10M8 3l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <p className="max-w-[28ch] text-[0.8125rem] leading-relaxed text-ink-50">
                We use your details only to answer this enquiry.
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Inputs: label above, hairline below, cyan on focus ── */
function Field({
  name,
  label,
  type = "text",
  required = false,
  textarea = false,
  autoComplete,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  autoComplete?: string;
}) {
  const shared =
    "w-full border-0 border-b border-line bg-transparent pt-2 pb-3 text-[1.0625rem] text-ink outline-none transition-colors duration-300 placeholder:text-ink-30 focus:border-cyan-brand";

  return (
    // `focus-within` on the label, not `peer-*`: the label text precedes the
    // input, and peer selectors only reach forward.
    <label className="group block">
      <span className="eyebrow block text-ink-30 transition-colors duration-300 group-focus-within:text-indigo-brand">
        {label}
        {required && <span className="ml-1 text-cyan-brand">*</span>}
      </span>
      {textarea ? (
        <textarea
          name={name}
          required={required}
          rows={5}
          className={`${shared} resize-y`}
          placeholder="A short description is enough — trade, numbers, location, timing."
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          autoComplete={autoComplete}
          className={shared}
        />
      )}
    </label>
  );
}

function Select({
  name,
  label,
  options,
}: {
  name: string;
  label: string;
  options: string[];
}) {
  return (
    <label className="group block">
      <span className="eyebrow block text-ink-30 transition-colors duration-300 group-focus-within:text-indigo-brand">
        {label}
      </span>
      <select
        name={name}
        defaultValue=""
        className="w-full appearance-none border-0 border-b border-line bg-transparent pt-2 pb-3 text-[1.0625rem] text-ink outline-none transition-colors duration-300 focus:border-cyan-brand"
      >
        <option value="">Not sure yet</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
