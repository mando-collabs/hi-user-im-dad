import { GitHubStrategy } from "remix-auth-github";
import { db } from "~/utils/db.server";

// app/services/auth.server.ts
import { Authenticator } from "remix-auth";
import * as sessionStorage from "~/utils/session.server";

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export let authenticator = new Authenticator<User>(sessionStorage);

const gitHubStrategy = new GitHubStrategy(
  {
    clientID: "YOUR_CLIENT_ID",
    clientSecret: "YOUR_CLIENT_SECRET",
    callbackURL: "https://example.com/auth/github/callback",
  },
  ({ accessToken, extraParams, profile }) => {
    // Get the user data from your DB or API using the tokens and profile

    return db.user.upsert({
      where: { externalId: profile.id },
      update: { displayName: profile.displayName },
      create: {
        externalId: profile.id,
        displayName: profile.displayName,
      },
    });
  }
);

// Tell the Authenticator to use the form strategy
authenticator.use(
  new FormStrategy(async ({ form }) => {
    let email = form.get("email");
    let password = form.get("password");
    let user = await login(email, password);
    // the type of this user must match the type you pass to the Authenticator
    // the strategy will automatically inherit the type if you instantiate
    // directly inside the `use` method
    return user;
  }),
  // each strategy has a name and can be changed to use another one
  // same strategy multiple times, especially useful for the OAuth2 strategy.
  "user-pass"
);
