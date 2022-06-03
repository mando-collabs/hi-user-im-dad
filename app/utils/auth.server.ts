import { GitHubStrategy } from "remix-auth-github";
import { db } from "~/utils/db.server";

// app/services/auth.server.ts
import { Authenticator } from "remix-auth";
import * as sessionStorage from "~/utils/session.server";
import { User } from "@prisma/client";
import { getRequiredEnvVariable } from "~/utils/environment";

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export const authenticator = new Authenticator<User & { profileImgUrl: string | null }>(sessionStorage);

const host = process.env.HOST || "http://localhost:3000";
const clientID = getRequiredEnvVariable("GITHUB_CLIENT_ID");
const clientSecret = getRequiredEnvVariable("GITHUB_CLIENT_SECRET");

const gitHubStrategy = new GitHubStrategy(
  {
    clientID,
    clientSecret,
    callbackURL: `${host}/auth/github/callback`,
  },
  async ({ accessToken, extraParams, profile }) => {
    // Get the user data from your DB or API using the tokens and profile
    const user = await db.user.upsert({
      where: { externalId: profile.id },
      update: { displayName: profile.displayName },
      create: {
        externalId: profile.id,
        displayName: profile.displayName,
      },
    });

    return {
      ...user,
      profileImgUrl: profile.photos[0]?.value ?? null,
    };
  }
);

// Tell the Authenticator to use the form strategy
authenticator.use(
  gitHubStrategy,
  // each strategy has a name and can be changed to use another one
  // same strategy multiple times, especially useful for the OAuth2 strategy.
  "github"
);
