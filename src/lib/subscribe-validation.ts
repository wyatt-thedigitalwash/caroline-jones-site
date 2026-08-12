// Shared validation + normalization for the subscribe endpoint.
// No external deps: matches the project's plain-validation style.
//
// This site is Laylo-only (no Mailchimp), so the payload carries only what Laylo
// can act on. Verified against the live API: subscribeToUser accepts exactly four
// arguments -- email (String), phoneNumber (String), userId (ID) and productId
// (ID). There is NO field for a name, zip, country, birthday or custom data, so
// collecting any of those would discard them on every submission.
//
// Country is still captured because it is functional rather than stored: it is
// what decides whether the fan is SMS-eligible, and therefore whether the phone
// is required and forwarded to Laylo at all.

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// A valid North American (NANP) 10-digit number: NXX-NXX-XXXX where the area
// code and exchange each start 2-9. Rejects all-zeros, 555-style fakes with a
// 0/1 exchange, and other malformed input.
const NANP_REGEX = /^[2-9]\d{2}[2-9]\d{6}$/;

// Countries Laylo can send SMS to and whose numbers use the +1 / NANP format.
// These strings must match COUNTRIES in ./countries.ts exactly.
export const SMS_COUNTRIES = new Set(["United States", "Canada"]);

export interface SubscriberInput {
  email: string;
  phoneE164: string; // E.164 for Laylo SMS; "" when not SMS-eligible (intl or none)
  country: string; // drives SMS eligibility only; never sent to Laylo
}

export type ValidationResult =
  | { ok: true; data: SubscriberInput }
  | { ok: false; field: "email" | "phone"; message: string };

export function sanitize(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

// Normalize a raw phone string to E.164 for a North American number. Bare
// numbers are assumed US/Canada (the audience default) and validated against the
// NANP rules, so a fan never needs to type "+1". An explicit "+1" is honored.
// Any other country code is rejected here: Laylo cannot text non-NANP numbers,
// so an international number must NOT be handed to the SMS call.
// Returns null when the input is not a valid North American phone number.
export function normalizePhoneE164(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  const hasPlus = trimmed.startsWith("+");
  const digits = trimmed.replace(/\D/g, "");
  if (!digits) return null;

  if (hasPlus) {
    // Explicit country code: only +1 is SMS-eligible.
    if (!digits.startsWith("1")) return null;
    const nanp = digits.slice(1);
    return NANP_REGEX.test(nanp) ? `+1${nanp}` : null;
  }

  // No country code typed: assume US/Canada and validate as NANP.
  let nanp: string | null = null;
  if (digits.length === 10) nanp = digits;
  else if (digits.length === 11 && digits.startsWith("1")) nanp = digits.slice(1);

  return nanp && NANP_REGEX.test(nanp) ? `+1${nanp}` : null;
}

// Validate + normalize the raw request body. Email is always required. Phone is
// required for US/Canada fans (Laylo can text them) and ignored for everyone
// else, since Laylo cannot send SMS internationally -- an international fan can
// still join by email.
export function validateSubscriber(body: Record<string, unknown>): ValidationResult {
  const email = sanitize(body.email, 254).toLowerCase();
  if (!email || !EMAIL_REGEX.test(email)) {
    return { ok: false, field: "email", message: "Please enter a valid email address." };
  }

  const country = sanitize(body.country, 100);
  const rawPhone = sanitize(body.phone, 30);

  let phoneE164 = "";

  if (SMS_COUNTRIES.has(country)) {
    // US/Canada: phone required and must be a valid North American number.
    if (!rawPhone) {
      return { ok: false, field: "phone", message: "Please enter a valid phone number." };
    }
    const normalized = normalizePhoneE164(rawPhone);
    if (!normalized) {
      return {
        ok: false,
        field: "phone",
        message: "Please enter a valid phone number including area code.",
      };
    }
    phoneE164 = normalized;
  }
  // International: phone is not collected for Laylo. phoneE164 stays "" so the
  // SMS call is skipped entirely (Laylo cannot text non-NANP numbers).

  return {
    ok: true,
    data: {
      email,
      phoneE164,
      country,
    },
  };
}
