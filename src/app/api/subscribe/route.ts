import { NextRequest, NextResponse } from 'next/server';

/* ------------------------------------------------------------------ */
/*  In-memory rate limiter (resets on deploy / restart)                */
/* ------------------------------------------------------------------ */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 5 * 60 * 1000; // 5 minutes
const RATE_LIMIT_MAX = 3;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitize(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value.trim().replace(/[<>]/g, '');
}

function validateFields(body: Record<string, unknown>): string | null {
  const email = body.email;
  if (typeof email !== 'string' || !EMAIL_RE.test(email)) {
    return 'A valid email address is required.';
  }
  if (email.length > 254) return 'Email is too long.';

  const phone = body.phone;
  if (phone !== undefined && phone !== '') {
    if (typeof phone !== 'string' || phone.length > 20) return 'Phone number is too long.';
  }

  const zip = body.zip;
  if (zip !== undefined && zip !== '') {
    if (typeof zip !== 'string' || zip.length > 10) return 'Zip code is too long.';
  }

  const country = body.country;
  if (country !== undefined && country !== '') {
    if (typeof country !== 'string' || country.length > 3) return 'Invalid country code.';
  }

  return null;
}

function toE164(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('1') && digits.length === 11) return `+${digits}`;
  if (digits.length === 10) return `+1${digits}`;
  return `+${digits}`;
}

/* ------------------------------------------------------------------ */
/*  Laylo GraphQL helper                                               */
/* ------------------------------------------------------------------ */
const LAYLO_GRAPHQL_URL = 'https://laylo.com/api/graphql';

async function layloSubscribe(
  apiKey: string,
  type: 'email' | 'phone',
  value: string,
): Promise<void> {
  const mutation = `
    mutation Subscribe($input: SubscribeInput!) {
      subscribe(input: $input) {
        success
      }
    }
  `;

  const res = await fetch(LAYLO_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      query: mutation,
      variables: {
        input: {
          type,
          value,
          source: 'carolinejones.com',
        },
      },
    }),
  });

  const json = await res.json();

  if (json.errors && json.errors.length > 0) {
    throw new Error(json.errors[0].message || 'Laylo GraphQL error');
  }
}

/* ------------------------------------------------------------------ */
/*  POST handler                                                       */
/* ------------------------------------------------------------------ */
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded?.split(',')[0]?.trim() || 'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 },
      );
    }

    // Parse body
    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid request body.' },
        { status: 400 },
      );
    }

    // Honeypot -- if the hidden "website" field has a value, silently succeed
    if (body.website) {
      return NextResponse.json({ success: true });
    }

    // Validate
    const validationError = validateFields(body);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    // Check Laylo API key
    const layloApiKey = process.env.LAYLO_API_KEY;
    if (!layloApiKey) {
      console.error('[subscribe] LAYLO_API_KEY is not set');
      return NextResponse.json(
        { error: 'Subscription service is temporarily unavailable.' },
        { status: 500 },
      );
    }

    const email = sanitize(body.email);
    const phone = sanitize(body.phone);

    // Subscribe email via Laylo (primary)
    try {
      await layloSubscribe(layloApiKey, 'email', email);
    } catch (err) {
      console.error('[subscribe] Laylo email subscription failed:', err);
      return NextResponse.json(
        { error: 'Something went wrong. Please try again.' },
        { status: 500 },
      );
    }

    // Subscribe phone via Laylo (secondary, non-blocking)
    if (phone) {
      try {
        const formattedPhone = toE164(phone);
        await layloSubscribe(layloApiKey, 'phone', formattedPhone);
      } catch (err) {
        console.error('[subscribe] Laylo phone subscription failed (non-blocking):', err);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[subscribe] Unexpected error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 },
    );
  }
}
