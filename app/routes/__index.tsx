import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { authenticator } from "~/utils/auth.server";
import { Outlet, useLoaderData, useTransition } from "@remix-run/react";
import { Header } from "~/components/Header";
import { JokeService } from "~/services/joke-service.server";
import { JokeQueue } from "~/components/JokeQueue";
import React from "react";
import { Tabs } from "~/components/Tabs";
import { PageLoader } from "~/components/PageLoader";
import type { UseDataFunctionReturn } from "@remix-run/react/dist/components";

export type RootLoaderData = UseDataFunctionReturn<typeof loader>;
export type SerializedJokes = RootLoaderData["jokeQueueJokes"];

export const loader = async ({ request }: LoaderArgs) => {
  const user = await authenticator.isAuthenticated(request);

  if (!user) {
    return redirect(`/login`);
  }

  const jokeService = new JokeService(user);
  const myJokesCount = await jokeService.getMyJokesCount();
  const jokeQueueJokes = await jokeService.getJokeQueueJokes();

  return json({
    userId: user.id,
    username: user.displayName,
    profileImgUrl: user.profileImgUrl,
    jokeQueueJokes,
    myJokesCount,
  });
};

export const meta: MetaFunction = () => {
  return {
    title: `Hi User, I'm Dad!`,
    description: "App Dev Dad Jokes",
  };
};

export default function __index() {
  const { username, profileImgUrl, jokeQueueJokes, myJokesCount, userId } = useLoaderData<typeof loader>();
  const { type, state } = useTransition();

  return (
    <div className="flex h-full flex-col">
      <Header username={username} profileImgUrl={profileImgUrl} />
      <div className="flex h-full flex-1">
        <div className="relative z-0 flex flex-1 overflow-hidden">
          <aside className="relative hidden w-full max-w-2xl shrink-0 overflow-hidden border-r border-gray-200 xl:order-first xl:flex xl:flex-col">
            {/* Start secondary column (hidden on smaller screens) */}
            <div className="absolute inset-0 overflow-auto py-6 px-4 sm:px-6 lg:px-8">
              <h1 className="mb-4 text-2xl font-extrabold text-primary-900 sm:text-3xl">The Joke Queue</h1>
              <JokeQueue jokes={jokeQueueJokes} userId={userId} />
            </div>
            {/* End secondary column */}
          </aside>

          <main className="relative z-0 flex-1 overflow-hidden focus:outline-none xl:order-last">
            {/* Start main area*/}
            <div className="absolute inset-0 overflow-y-auto py-6 px-4 sm:px-6 lg:px-8">
              <Tabs myJokesCount={myJokesCount} />

              <div className="mt-4">{type === "normalLoad" && state === "loading" ? <PageLoader /> : <Outlet />}</div>
            </div>
            {/* End main area */}
          </main>
        </div>
      </div>
    </div>
  );
}
