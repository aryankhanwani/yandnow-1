"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MaskLines, Reveal } from "./motion-primitives";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Field labels keep the site's mono/uppercase label voice but run larger than
 * the shared `.eyebrow` (11px) and a step darker than `ink-30`, which measured
 * 2.3:1 against paper — too faint to read on the page you have to type into.
 * Scoped here rather than changed on `.eyebrow`, which every other section uses.
 */
const LABEL =
  "block font-mono text-[0.8125rem] leading-none font-medium tracking-[0.11em] text-ink-70 uppercase transition-colors duration-300 group-focus-within:text-indigo-brand";

type Status = "idle" | "sending" | "sent";

const MESSAGE_MAX = 600;
const LEARNER = "Learner enquiry";

/**
 * There is no backend wired up yet, so the form validates, then hands the
 * enquiry to the user's mail client rather than pretending to submit.
 * Swap `handoff()` for a POST when the endpoint exists.
 */
export default function ContactForm({
  enquiryTypes,
  email,
}: {
  enquiryTypes: readonly string[];
  email: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [topic, setTopic] = useState("");
  const [count, setCount] = useState(0);
  // Learners rarely have an organisation to name, so the field steps aside.
  const isLearner = topic === LEARNER;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");

    const phone = String(data.get("phone") ?? "").trim();
    const body = [
      `Name: ${data.get("name")}`,
      ...(isLearner ? [] : [`Organisation: ${data.get("org") || "—"}`]),
      `Email: ${data.get("email")}`,
      `Phone: ${phone && phone !== "+91" ? phone : "—"}`,
      `About: ${data.get("topic")}`,
      "",
      String(data.get("message") ?? ""),
    ].join("\n");

    const href = `mailto:${email}?subject=${encodeURIComponent(
      `${data.get("topic")} — ${data.get("org") || data.get("name")}`,
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = href;
    setStatus("sent");
    form.reset();
    setTopic("");
    setCount(0);
  }

  return (
    <div>
      <Reveal>
        <p className="eyebrow text-indigo-brand">Send an enquiry</p>
      </Reveal>
      <MaskLines
        as="h2"
        className="display-md mt-6 max-w-[20ch] font-semibold"
        lines={["Tell us what you", "are trying to solve."]}
      />

      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mt-12 border border-line bg-paper p-6 md:p-8"
          >
            <p className="font-display text-[1.375rem] font-semibold tracking-[-0.03em]">
              Your mail client should be open.
            </p>
            <p className="mt-3 max-w-[46ch] text-[1.0625rem] leading-relaxed text-ink-70">
              Send the draft and it will reach the right team. If nothing opened,
              write to{" "}
              <a
                href={`mailto:${email}`}
                className="font-medium break-all text-indigo-brand underline decoration-1 underline-offset-[4px]"
              >
                {email}
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
            className="mt-10 grid gap-x-6 gap-y-7 sm:grid-cols-2 md:mt-12"
          >
            <div className="sm:col-span-2">
              <Select
                name="topic"
                label="What is this about?"
                options={enquiryTypes}
                value={topic}
                onChange={setTopic}
                required
              />
            </div>

            <Field name="name" label="Name" required autoComplete="name" />
            {!isLearner && (
              <Field name="org" label="Organisation" autoComplete="organization" />
            )}
            <Field name="email" label="Email" type="email" required autoComplete="email" />
            <Field
              name="phone"
              label="Phone"
              type="tel"
              autoComplete="tel"
              defaultValue="+91 "
            />

            <div className="sm:col-span-2">
              <Field
                name="message"
                label="Tell us what you need"
                textarea
                required
                maxLength={MESSAGE_MAX}
                onInput={(v) => setCount(v.length)}
              />
              <p className="mt-2 text-right font-mono text-[0.6875rem] tracking-[0.08em] text-ink-50 tabular-nums">
                {count} / {MESSAGE_MAX}
              </p>
            </div>

            <label className="flex items-start gap-3 sm:col-span-2">
              <input
                type="checkbox"
                name="consent"
                required
                className="mt-1 h-4 w-4 shrink-0 accent-indigo-brand"
              />
              <span className="text-[0.9375rem] leading-relaxed text-ink-70">
                I agree that Y&amp;Now may use these details to respond to my enquiry.
                <span className="ml-1 text-cyan-brand">*</span>
              </span>
            </label>

            <div className="sm:col-span-2 flex flex-wrap items-center gap-x-6 gap-y-4">
              <button
                type="submit"
                disabled={status === "sending"}
                className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 font-medium text-paper-warm transition-colors duration-300 hover:bg-indigo-brand disabled:opacity-60"
              >
                {status === "sending" ? "Preparing…" : "Talk to Y&Now"}
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
              <p className="max-w-[36ch] text-[0.8125rem] leading-relaxed text-ink-50">
                We use your information only to respond to your enquiry.
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
  defaultValue,
  maxLength,
  onInput,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  autoComplete?: string;
  defaultValue?: string;
  maxLength?: number;
  onInput?: (value: string) => void;
}) {
  const shared =
    "w-full border-0 border-b border-line bg-transparent pt-2 pb-3 text-[1.0625rem] text-ink outline-none transition-colors duration-300 placeholder:text-ink-30 focus:border-cyan-brand";

  return (
    // `focus-within` on the label, not `peer-*`: the label text precedes the
    // input, and peer selectors only reach forward.
    <label className="group block">
      <span className={LABEL}>
        {label}
        {required && <span className="ml-1 text-cyan-brand">*</span>}
      </span>
      {textarea ? (
        <textarea
          name={name}
          required={required}
          rows={5}
          maxLength={maxLength}
          onInput={onInput ? (e) => onInput(e.currentTarget.value) : undefined}
          className={`${shared} resize-y`}
          placeholder="The outcome you need, who it is for, and where things stand today."
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          autoComplete={autoComplete}
          defaultValue={defaultValue}
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
  value,
  onChange,
  required = false,
}: {
  name: string;
  label: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <label className="group block">
      <span className={LABEL}>
        {label}
        {required && <span className="ml-1 text-cyan-brand">*</span>}
      </span>
      <span className="relative block">
        <select
          name={name}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full appearance-none border-0 border-b border-line bg-transparent pt-2 pr-8 pb-3 text-[1.0625rem] outline-none transition-colors duration-300 focus:border-cyan-brand ${
            value ? "text-ink" : "text-ink-50"
          }`}
        >
          <option value="" disabled>
            Choose one
          </option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          aria-hidden
          className="pointer-events-none absolute top-1/2 right-1 -translate-y-1/2 text-ink-50"
        >
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </label>
  );
}
