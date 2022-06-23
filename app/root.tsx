import type { LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from "@remix-run/react";
import styles from "./tailwind.css";
import { getRequiredEnvVariable } from "~/utils/environment";
import { PusherProvider } from "~/components/PusherProvider";
import { ClientOnlyProvider } from "~/components/ClientOnlyProvider";

declare global {
  interface Window {
    ENV: {
      pusherAppKey: string;
      pusherAppCluster: string;
    };
  }
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

interface LoaderData {
  env: {
    pusherAppKey: string;
    pusherAppCluster: string;
  };
}

export const loader: LoaderFunction = async ({ request }) => {
  const env = {
    pusherAppKey: getRequiredEnvVariable("PUSHER_APP_KEY"),
    pusherAppCluster: getRequiredEnvVariable("PUSHER_APP_CLUSTER"),
  };

  const data: LoaderData = { env };
  return data;
};

export default function App() {
  const data = useLoaderData<LoaderData>();

  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.env)}`,
          }}
        />
        <ClientOnlyProvider provider={PusherProvider}>
          <Outlet />
        </ClientOnlyProvider>
        <ScrollRestoration />

        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
