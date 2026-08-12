// Legally required disclosure shown under the subscribe form. Laylo sends the
// SMS confirmation on our behalf, so US TCPA / 10DLC rules require the automated
// marketing text disclosure, the "consent is not a condition of purchase" line,
// the STOP instruction, and links to both our policies and Laylo's.
// Do not trim this copy or drop any link without legal sign-off.

const linkClass = "underline hover:text-[#DDE2CD]";

export default function SubscribeConsent() {
  return (
    <p className="mt-4 text-center font-[family-name:var(--font-body)] text-[10px] leading-relaxed text-[#DDE2CD]/60">
      By subscribing you agree to receive email and recurring automated marketing
      text messages. We will text you once to confirm your number, reply to opt in.
      Consent is not a condition of purchase. Message and data rates may apply.
      Reply STOP to cancel. See the{" "}
      <a
        href="https://www.bigmachinerecords.com/privacy"
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        Big Machine Records Privacy Policy
      </a>
      , our{" "}
      <a href="/legal/tcpa" className={linkClass}>
        TCPA Policy
      </a>
      , and Laylo&apos;s{" "}
      <a
        href="https://laylo.com/terms"
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        Terms
      </a>{" "}
      and{" "}
      <a
        href="https://laylo.com/privacy"
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        Privacy Policy
      </a>
      .
    </p>
  );
}
