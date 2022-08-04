# Welcome to Remix!

- [Remix Docs](https://remix.run/docs)

## Development

create a `.env` file at the root of the project (you can get the values from a fellow dad):
```dotenv
DATABASE_URL
PUBLIC_HOST
GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET
PUSHER_APP_ID
PUSHER_APP_KEY
PUSHER_APP_SECRET
PUSHER_APP_CLUSTER
SESSION_SECRET
```

From your terminal:

install dependencies:
```sh
npm install
```

> ⚠️ To install dependencies you need a GitHub token with permissions to read packages. If you don't have one and are getting 401 errors during installation you can set up a token here: https://github.com/settings/tokens/new and add the following to `~/.npmrc`:
```sh
//npm.pkg.github.com/:_authToken=YOUR_SUPER_SECRET_TOKEN_HERE
```

run the dev server:
```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Fly Setup (optional)

1. [Install `flyctl`](https://fly.io/docs/getting-started/installing-flyctl/)

2. Sign up and log in to Fly

```sh
flyctl auth signup
```

3. Setup Fly. It might ask if you want to deploy, say no since you haven't built the app yet.

```sh
flyctl launch
```

## Deployment

If you've followed the setup instructions already, all you need to do is run this:

```sh
npm run deploy
```

You can run `flyctl info` to get the url and ip address of your server.

Check out the [fly docs](https://fly.io/docs/getting-started/node/) for more information.
