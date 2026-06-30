import { NextRequest, NextResponse } from 'next/server';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LAYLO_URL = 'https://laylo.com/api/graphql';

/* ------------------------------------------------------------------ */
/*  Rate limiting: in-memory IP map, 3 submissions per 5 minutes      */
/* ------------------------------------------------------------------ */
const RATE_LIMIT_WINDOW = 5 * 60 * 1000;
const RATE_LIMIT_MAX = 3;
const ipMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipMap.get(ip);
  if (!entry || now > entry.resetAt) {
    ipMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

/* ------------------------------------------------------------------ */
/*  POST handler                                                       */
/* ------------------------------------------------------------------ */
export async function POST(request: NextRequest) {
  // Rate limiting
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded?.split(',')[0]?.trim() ?? 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: 'Too many requests. Please try again later.' },
      { status: 429 },
    );
  }

  let body: {
    email?: string;
    phone?: string;
    zip?: string;
    country?: string;
    website?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid request body.' },
      { status: 400 },
    );
  }

  // Honeypot: if the hidden "website" field is filled, silently succeed
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const email = (body.email ?? '').trim().toLowerCase();
  const phone = (body.phone ?? '').trim();

  // Validation
  if (!email || !EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json(
      { ok: false, error: 'A valid email address is required.' },
      { status: 400 },
    );
  }

  if (phone.length > 20) {
    return NextResponse.json(
      { ok: false, error: 'Phone number is too long.' },
      { status: 400 },
    );
  }

  // Laylo API key
  const layloApiKey = process.env.LAYLO_API_KEY;
  if (!layloApiKey) {
    console.error('[subscribe] LAYLO_API_KEY is not set');
    return NextResponse.json(
      { ok: false, error: 'Subscription service is temporarily unavailable.' },
      { status: 500 },
    );
  }

  // ---------------------------------------------------------------
  // Laylo (fire-and-forget)
  // A Laylo failure must never affect the user-facing response.
  // ---------------------------------------------------------------
  try {
    const layloHeaders = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${layloApiKey}`,
    };

    // Call 1: subscribe by email
    fetch(LAYLO_URL, {
      method: 'POST',
      headers: layloHeaders,
      body: JSON.stringify({
        query: `mutation($email: String) { subscribeToUser(email: $email) }`,
        variables: { email },
      }),
    }).catch(() => {});

    // Call 2: subscribe by phone (only if provided)
    if (phone) {
      const digits = phone.replace(/\D/g, '');
      const formatted = digits.startsWith('1') ? `+${digits}` : `+1${digits}`;

      fetch(LAYLO_URL, {
        method: 'POST',
        headers: layloHeaders,
        body: JSON.stringify({
          query: `mutation($phoneNumber: String) { subscribeToUser(phoneNumber: $phoneNumber) }`,
          variables: { phoneNumber: formatted },
        }),
      }).catch(() => {});
    }
  } catch {
    // Laylo errors are silently swallowed
  }

  return NextResponse.json({ ok: true });
}
