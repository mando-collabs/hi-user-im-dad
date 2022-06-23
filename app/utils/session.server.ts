import { createCookieSessionStorage } from "@remix-run/node";
import { getRequiredEnvVariable } from "~/utils/environment"; // or "@remix-run/cloudflare"

const { getSession, destroySession, ...sessionStorage } = createCookieSessionStorage({
  // a Cookie from `createCookie` or the CookieOptions to create one
  cookie: {
    name: "__session",
    httpOnly: true,
    maxAge: 60 * 24 * 31 * 365,
    path: "/",
    sameSite: "lax",
    secrets: [getRequiredEnvVariable("SESSION_SECRET")],
    secure: true,
  },
});

type CommitSession = typeof sessionStorage.commitSession;

const commitSession: CommitSession = (session, options) =>
  sessionStorage.commitSession(session, { ...options, expires: new Date(Date.now() + 60_000 * 60 * 24 * 31 * 365) });

export { getSession, commitSession, destroySession };
