import { createCookieSessionStorage } from "@remix-run/node"; // or "@remix-run/cloudflare"

const { getSession, commitSession, destroySession } = createCookieSessionStorage({
  // a Cookie from `createCookie` or the CookieOptions to create one
  cookie: {
    name: "__session",
    expires: new Date(Date.now() + 60_000 * 60 * 24 * 31 * 365),
    httpOnly: true,
    maxAge: 60 * 24 * 31 * 365,
    path: "/",
    sameSite: "lax",
    secrets: ["s3cret1"],
    secure: true,
  },
});

export { getSession, commitSession, destroySession };
