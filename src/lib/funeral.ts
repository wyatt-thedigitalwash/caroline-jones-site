// "Your Wife Is Dead" campaign (/yourwifeisdead, alias /rsvp). The song is
// out (released 10/30/2026, midnight ET); the invitation now points at the
// listen link.

export const LISTEN_URL = "https://carolinejones.ffm.to/yourwifeisdead.JOA";

// The invitation's headline slot. Read "10/30 / Midnight EST" until release.
export const SERVICE_DATE = "Out Now";
export const SERVICE_TIME = "Streaming Everywhere";

// Approval gate. While true, /yourwifeisdead asks for a password (browser
// prompt, any username), is marked noindex, and is left out of the sitemap.
// Set to false and deploy to launch publicly.
export const FUNERAL_GATED = false;

// SHA-256 of the shared approval password (the password itself is not stored
// in the repo). Generate a new one with: printf %s 'new-password' | shasum -a 256
export const FUNERAL_PASSWORD_SHA256 =
  "1a0e803407c65d687e8538af681e912d568c90f3c9b298bf1c63f1d2d5ef00ec";
