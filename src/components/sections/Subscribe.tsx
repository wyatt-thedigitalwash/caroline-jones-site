"use client";

import { useState, type FormEvent } from "react";

const fields = [
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone", type: "tel" },
  { name: "zip", label: "Zip Code", type: "text" },
  { name: "country", label: "Country", type: "text" },
];

export default function Subscribe() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    /* PLACEHOLDER: This component is not currently in use -- subscribe form lives in Footer */
    setSubmitted(true);
  }

  return (
    <section
      id="subscribe"
      data-bg="dark"
      className="bg-[#5D3635] px-6 py-20 md:py-28"
    >
      <p className="mb-4 text-center font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.25em] text-[#DDE2CD]">
        Stay Connected
      </p>

      <p className="mx-auto mb-14 max-w-lg text-center font-[family-name:var(--font-heading)] text-xl italic text-[#DDE2CD] md:mb-16">
        Be the first to hear about new music, tour dates, and more.
      </p>

      <div className="mx-auto max-w-[560px]">
        {submitted ? (
          <p className="text-center font-[family-name:var(--font-heading)] text-xl italic text-[#DDE2CD]">
            Thank you for subscribing.
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {fields.map((field) => (
                <div key={field.name}>
                  <label className="mb-1.5 block font-[family-name:var(--font-body)] text-[10px] uppercase tracking-[0.2em] text-[#DDE2CD]">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    className="w-full border border-[#DDE2CD] bg-transparent px-4 py-3 font-[family-name:var(--font-body)] text-sm text-[#DDE2CD] outline-none placeholder:text-[#DDE2CD]/40 focus:border-[#DDE2CD]"
                  />
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                className="w-full border border-[#DDE2CD] bg-transparent px-10 py-3 font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.2em] text-[#DDE2CD] transition-colors hover:bg-[#DDE2CD]/10 md:w-auto"
              >
                Subscribe
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
