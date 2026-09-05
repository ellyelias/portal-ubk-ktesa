import { jwtVerify, createRemoteJWKSet, type JWTPayload } from "jose";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Cloudflare Access authentication.
 *
 * This replaces the old "Sign in with ChatGPT" (SIWC) helper that only works
 * when this app is hosted on ChatGPT Sites. Outside ChatGPT Sites, access to
 * /kaunselor is protected instead by a Cloudflare Access application placed
 * in front of that path. Cloudflare verifies the visitor's identity (Google
 * sign-in, one-time PIN email, etc.) at the edge and forwards a signed JWT in
 * the `Cf-Access-Jwt-Assertion` header. We verify that JWT here rather than
 * trusting a plain header, so a request can't forge an identity by hitting
 * this Worker directly.
 *
 * Required environment variables (set these as Cloudflare Worker vars, see
 * README.md "Deploying outside ChatGPT Sites"):
 *   - CF_ACCESS_TEAM_DOMAIN  e.g. "yourteam.cloudflareaccess.com"
 *   - CF_ACCESS_AUD          the Application Audience (AUD) tag shown on the
 *                            Access application in the Cloudflare dashboard
 */

const JWT_ASSERTION_HEADER = "cf-access-jwt-assertion";

let cachedJwks: ReturnType<typeof createRemoteJWKSet> | null = null;
let cachedForDomain = "";

function getJwks(teamDomain: string) {
  if (!cachedJwks || cachedForDomain !== teamDomain) {
    cachedJwks = createRemoteJWKSet(
      new URL(`https://${teamDomain}/cdn-cgi/access/certs`),
    );
    cachedForDomain = teamDomain;
  }
  return cachedJwks;
}

export type PortalUser = {
  email: string;
};

export async function getAccessUser(): Promise<PortalUser | null> {
  const teamDomain = process.env.CF_ACCESS_TEAM_DOMAIN;
  const audience = process.env.CF_ACCESS_AUD;
  if (!teamDomain || !audience) {
    // Access isn't configured yet (e.g. local dev without Cloudflare Access
    // in front of it). Fail closed: no verified user.
    return null;
  }

  const requestHeaders = await headers();
  const token = requestHeaders.get(JWT_ASSERTION_HEADER);
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getJwks(teamDomain), {
      audience,
    });
    const email = extractEmail(payload);
    return email ? { email: email.toLowerCase() } : null;
  } catch {
    // Expired, malformed, or signed for a different Access application.
    return null;
  }
}

export async function requireAccessUser(): Promise<PortalUser> {
  const user = await getAccessUser();
  if (user) return user;

  // Cloudflare Access itself intercepts unauthenticated requests to a
  // protected path and shows its own login page before the request ever
  // reaches this app. Landing here without a valid token almost always
  // means Access isn't set up in front of this route yet — send the
  // visitor home rather than showing a broken dashboard.
  redirect("/");
}

/** Fixed path Cloudflare serves on any Access-protected hostname. */
export const ACCESS_LOGOUT_PATH = "/cdn-cgi/access/logout";

function extractEmail(payload: JWTPayload): string | null {
  const email = payload.email;
  return typeof email === "string" && email.length > 0 ? email : null;
}
