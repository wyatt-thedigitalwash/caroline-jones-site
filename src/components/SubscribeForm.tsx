"use client";

import { useCallback, useRef, useState } from "react";
import { COUNTRIES } from "@/lib/countries";
import { SMS_COUNTRIES } from "@/lib/subscribe-validation";
import SubscribeConsent from "@/components/SubscribeConsent";

type FormStatus = "idle" | "loading" | "success" | "error";
type ErrorField = "email" | "phone" | "";

const baseInput =
  "w-full border bg-transparent px-5 py-4 font-[family-name:var(--font-body)] text-sm text-[#DDE2CD] outline-none placeholder:text-[#DDE2CD]/40";

const DEFAULT_SUCCESS =
  "You're subscribed. Check your phone for a text and reply to confirm SMS updates.";

// Keep only digits and auto-format a US number as NXX-NXX-XXXX as the fan types.
// Handles pastes that include a leading country code (1 or +1) or punctuation.
function formatUsPhone(value: string): string {
  let d = value.replace(/\D/g, "");
  if (d.length === 11 && d.startsWith("1")) d = d.slice(1);
  d = d.slice(0, 10);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`;
}

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("United States");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorField, setErrorField] = useState<ErrorField>("");
  const [successMessage, setSuccessMessage] = useState("");

  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  // The success message REPLACES the form, so the submit button that had focus
  // unmounts. A live region alone is unreliable for a node that did not exist
  // before, so move focus onto the message to guarantee it is announced.
  const focusOnMount = useCallback((node: HTMLParagraphElement | null) => {
    node?.focus();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return; // guard double-submit (e.g. double Enter)
    setStatus("loading");
    setErrorMessage("");
    setErrorField("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone, country, website }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok) {
        setSuccessMessage(data?.message || DEFAULT_SUCCESS);
        setStatus("success");
        setEmail("");
        setPhone("");
        setCountry("United States");
        return;
      }

      const field: ErrorField =
        data?.field === "email" || data?.field === "phone" ? data.field : "";
      setErrorMessage(data?.error || "Something went wrong. Please try again.");
      setErrorField(field);
      setStatus("error");
      // Move focus to the offending field so the fan can fix it immediately.
      // setTimeout, not requestAnimationFrame: rAF does not fire at all while the
      // tab is backgrounded, which would silently skip the focus move.
      setTimeout(() => {
        if (field === "email") emailRef.current?.focus();
        else if (field === "phone") phoneRef.current?.focus();
      }, 0);
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p
        ref={focusOnMount}
        tabIndex={-1}
        className="py-4 text-center font-[family-name:var(--font-heading)] text-base italic text-[#DDE2CD] outline-none"
        role="status"
        aria-live="polite"
      >
        {successMessage || DEFAULT_SUCCESS}
      </p>
    );
  }

  const fieldClass = (field?: ErrorField) =>
    `${baseInput} ${
      field && errorField === field
        ? "border-red-300 focus-visible:border-red-200"
        : "border-[#DDE2CD]/50 focus-visible:border-[#DDE2CD]"
    }`;

  // US/Canada use the +1 auto-formatted, required field. Laylo can only text
  // those numbers, so elsewhere the phone is not collected at all.
  const isNorthAmerica = SMS_COUNTRIES.has(country);

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Subscribe to newsletter"
      className="relative w-full"
    >
      {/* Honeypot -- visually hidden, off-screen */}
      <div className="absolute -left-[9999px] top-0" aria-hidden="true">
        <label htmlFor="subscribe-website">Website</label>
        <input
          id="subscribe-website"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      {status === "error" && (
        <p
          id="subscribe-error"
          role="alert"
          className="mb-4 text-center font-[family-name:var(--font-body)] text-sm text-red-300"
        >
          {errorMessage || "Something went wrong. Please try again."}
        </p>
      )}

      <div className="mb-4">
          <label htmlFor="subscribe-email" className="sr-only">
            Email
          </label>
          <input
            ref={emailRef}
            id="subscribe-email"
            type="email"
            name="email"
            placeholder="Email*"
            required
            aria-required="true"
            aria-invalid={errorField === "email"}
            aria-describedby={status === "error" ? "subscribe-error" : undefined}
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={fieldClass("email")}
          />
        </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="subscribe-phone" className="sr-only">
            Phone Number
          </label>
          {isNorthAmerica ? (
            <div
              className={`flex items-stretch border bg-transparent ${
                errorField === "phone"
                  ? "border-red-300 focus-within:border-red-200"
                  : "border-[#DDE2CD]/50 focus-within:border-[#DDE2CD]"
              }`}
            >
              <span
                className="flex select-none items-center pl-5 pr-2 font-[family-name:var(--font-body)] text-sm text-[#DDE2CD]/40"
                aria-hidden="true"
              >
                +1
              </span>
              <input
                ref={phoneRef}
                id="subscribe-phone"
                type="tel"
                name="phone"
                inputMode="numeric"
                placeholder="555-555-5555"
                required
                aria-required="true"
                aria-invalid={errorField === "phone"}
                aria-describedby={status === "error" ? "subscribe-error" : undefined}
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(formatUsPhone(e.target.value))}
                className="w-full border-0 bg-transparent py-4 pr-5 font-[family-name:var(--font-body)] text-sm text-[#DDE2CD] outline-none placeholder:text-[#DDE2CD]/40"
              />
            </div>
          ) : (
            // Laylo can only text North American numbers, and this site has no
            // other store, so an international number would go nowhere. Show the
            // field inert rather than collecting data we cannot act on.
            <input
              id="subscribe-phone"
              type="tel"
              name="phone"
              placeholder="Phone (US and Canada only)"
              disabled
              value=""
              readOnly
              className={`${fieldClass()} cursor-not-allowed opacity-50`}
            />
          )}
        </div>

        <div>
          <label htmlFor="subscribe-country" className="sr-only">
            Country
          </label>
          <select
            id="subscribe-country"
            name="country"
            value={country}
            onChange={(e) => {
              const next = e.target.value;
              setCountry(next);
              // Drop any number already typed when the fan leaves the SMS
              // region, so a hidden field can never submit a stale phone.
              if (!SMS_COUNTRIES.has(next)) setPhone("");
              if (errorField === "phone") setErrorField("");
            }}
            className={`${fieldClass()} [&>option]:bg-[#5D3635] [&>option]:text-[#DDE2CD]`}
          >
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <button
          type="submit"
          disabled={status === "loading"}
          className="min-h-[44px] w-full bg-[#DDE2CD] py-4 font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.25em] text-[#5D3635] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "loading" ? "Submitting..." : "Subscribe"}
        </button>
      </div>

      <SubscribeConsent />
    </form>
  );
}
