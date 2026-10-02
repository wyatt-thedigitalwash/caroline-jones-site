import { NextResponse, type NextRequest } from "next/server";
import { FUNERAL_GATED, FUNERAL_PASSWORD_SHA256 } from "@/lib/funeral";

// Password gate for the campaign page while it's awaiting approval. Uses the
// browser's built-in Basic Auth prompt: any username, shared password.
const NOINDEX = { "X-Robots-Tag": "noindex, nofollow" };

async function sha256Hex(value: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

async function isAuthorized(request: NextRequest): Promise<boolean> {
  const header = request.headers.get("authorization");
  if (!header?.startsWith("Basic ")) return false;
  try {
    const decoded = atob(header.slice(6));
    const password = decoded.slice(decoded.indexOf(":") + 1);
    return (await sha256Hex(password)) === FUNERAL_PASSWORD_SHA256;
  } catch {
    return false;
  }
}

export async function proxy(request: NextRequest) {
  if (!FUNERAL_GATED) return NextResponse.next();

  if (await isAuthorized(request)) {
    const response = NextResponse.next();
    response.headers.set("X-Robots-Tag", NOINDEX["X-Robots-Tag"]);
    return response;
  }

  return new NextResponse("Password required.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="The Funeral of Her", charset="UTF-8"', ...NOINDEX },
  });
}

export const config = {
  matcher: ["/yourwifeisdead", "/yourwifeisdead/:path*"],
};
