import { NextRequest, NextResponse } from "next/server";
import { validateSubscriber } from "@/lib/subscribe-validation";
import { subscribeToLaylo, type LayloResult } from "@/lib/laylo";

// Laylo is the ONLY provider on this site, so unlike the Mailchimp+Laylo sites
// its outcome IS the user-facing result. 10s is the lowest ceiling any Vercel
// plan imposes and comfortably covers two sequential 4s Laylo calls.
export const maxDuration = 10;
export const runtime = "nodejs";

// In-memory rate limiting: IP -> { count, resetAt }
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 5 * 60 * 1000; // 5 minutes

// Order matters. `x-vercel-forwarded-for` and `x-real-ip` are stamped by the
// Vercel edge and cannot be spoofed by the caller; `x-forwarded-for` can have a
// client-supplied value prepended, which would let a bot rotate the rate-limit
// key at will. Fall back to it last so local/non-Vercel runs still work.
function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip")?.trim() ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

// Best-effort, per-instance limiter. Prune expired entries so the map cannot
// grow unbounded from one-off IPs on a long-lived (warm) server instance.
function pruneRateLimit(now: number): void {
  for (const [ip, entry] of rateLimitMap) {
    if (now > entry.resetAt) rateLimitMap.delete(ip);
  }
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  if (rateLimitMap.size > 5000) pruneRateLimit(now);

  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    // Honeypot: silently accept bots without hitting any provider. Logged so a
    // false positive (e.g. an autofill extension filling the hidden field for a
    // real fan) leaves a trace instead of vanishing as a silent drop.
    if (body.website) {
      console.error("[Subscribe] Honeypot triggered, submission dropped");
      return NextResponse.json({ success: true });
    }

    const validation = validateSubscriber(body as Record<string, unknown>);
    if (!validation.ok) {
      return NextResponse.json(
        { error: validation.message, field: validation.field },
        { status: 400 }
      );
    }
    const data = validation.data;

    // subscribeToLaylo never throws and returns a typed result; the catch below
    // is a backstop only.
    const laylo: LayloResult = await subscribeToLaylo(data);

    // A captured email is a success even if the SMS opt-in was rejected -- the
    // email is the durable identifier and the fan is on the list either way.
    if (laylo.ok) {
      if (laylo.note === "phone_rejected") {
        console.error("[Subscribe] Laylo phone rejected for", data.email);
        return NextResponse.json({
          success: true,
          message:
            "You're subscribed by email. We could not confirm your phone number for text updates.",
        });
      }
      return NextResponse.json({ success: true });
    }

    // Laylo is the only store, so a hard failure means the fan was NOT captured.
    // Surface a retryable error rather than a false success.
    console.error("[Subscribe] Laylo capture failed for", data.email, laylo.error);
    if (laylo.error === "not_configured") {
      return NextResponse.json(
        { error: "Subscriptions are temporarily unavailable. Please try again later." },
        { status: 503 }
      );
    }
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 502 }
    );
  } catch (err) {
    console.error("[Subscribe] Unexpected error", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
