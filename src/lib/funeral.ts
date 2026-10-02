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
