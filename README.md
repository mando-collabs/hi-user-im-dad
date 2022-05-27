# Welcome!

- [Remix Docs](https://remix.run/docs)

## Setup

1. Install the [Netlify CLI](https://www.netlify.com/products/dev/):

```sh
npm i -g netlify-cli
```

If you have previously installed the Netlify CLI, you should update it to the latest version:

```sh
npm i -g netlify-cli@latest
```

2. Prepare the repository

```shell
npm install

npm run db:prepare

npm run build
```

2. Sign up and log in to Netlify:

```sh
netlify login
```

## Development

The Netlify CLI starts your app in development mode, rebuilding assets on file changes.

```sh
npm run dev
```

Open up [http://localhost:3000](http://localhost:3000), and you should be ready to go!

## Features Ideas

- Entry Modal
  - Whats your name?
  - Cookie
- My Jokes
  - Add via random generator (icanhazdadjokes API?)
  - Submit own
  - Persist your backlog of jokes
  - Submit to Tuesday Queue
- Tuesday Joke Queue
  - Past delivered w/ ranking
  - Queued jokes
    - Joke blurred if current user not submitter w/ submitter name visible always
