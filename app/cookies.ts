import { createCookie } from "@remix-run/node"; // or "@remix-run/cloudflare"

export const userCookie = createCookie("user", {
  expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // expires in 24 hours
});
