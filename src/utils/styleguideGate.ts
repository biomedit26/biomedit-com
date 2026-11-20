// Light password gate for /styleguide. Not real security: it keeps casual
// visitors out of an unlisted page. One shared password; a cookie
// remembers the browser for 90 days. The password is checked on the
// server, so it never appears in the page source.
import type { AstroCookies } from 'astro';

const PASSWORD = 'creative';
const COOKIE = 'be_styleguide';
const TOKEN = 'ok-v1'; // change to sign everyone out

export const hasAccess = (cookies: AstroCookies) => cookies.get(COOKIE)?.value === TOKEN;

export function tryUnlock(cookies: AstroCookies, attempt: string, secure: boolean): boolean {
  if (attempt.trim().toLowerCase() !== PASSWORD) return false;
  cookies.set(COOKIE, TOKEN, { path: '/', httpOnly: true, sameSite: 'lax', secure, maxAge: 60 * 60 * 24 * 90 });
  return true;
}
