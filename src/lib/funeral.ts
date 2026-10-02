// "Your Wife Is Dead" pre-save campaign (/yourwifeisdead, alias /rsvp).

export const PRESAVE_URL = "https://carolinejones.ffm.to/yourwifeisdead.JOA";

// Midnight Eastern on release day. 10/30 is still daylight time (EDT, -04:00);
// DST ends 11/1.
export const RELEASE_AT = new Date("2026-10-30T00:00:00-04:00");

// Matches the approved invite art.
export const SERVICE_DATE = "10/30";
export const SERVICE_TIME = "Midnight EST";

export function isReleased(now: Date = new Date()): boolean {
  return now.getTime() >= RELEASE_AT.getTime();
}

// Cover art for the desktop lockup. Leave null to show the placeholder; when
// the artwork arrives, add it to /public/funeral and set it here, e.g.
// { src: "/funeral/your-wife-is-dead-cover.jpg", width: 3000, height: 3000 }.
export const COVER_ART: { src: string; width: number; height: number } | null = null;

// Approval gate. While true, /yourwifeisdead asks for a password (browser
// prompt, any username), is marked noindex, and is left out of the sitemap.
// Set to false and deploy to launch publicly.
export const FUNERAL_GATED = true;

// SHA-256 of the shared approval password (the password itself is not stored
// in the repo). Generate a new one with: printf %s 'new-password' | shasum -a 256
export const FUNERAL_PASSWORD_SHA256 =
  "1a0e803407c65d687e8538af681e912d568c90f3c9b298bf1c63f1d2d5ef00ec";
