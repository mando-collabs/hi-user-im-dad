import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { authenticator } from "~/utils/auth.server";
import { Outlet, useLoaderData, useTransition } from "@remix-run/react";
import { Header } from "~/components/Header";
import type { JokeQueueJoke } from "~/services/joke-service.server";
import { JokeService } from "~/services/joke-service.server";
import { JokeQueue } from "~/components/JokeQueue";
import React from "react";
import { Tabs } from "~/components/Tabs";
import { PageLoader } from "~/components/PageLoader";

interface LoaderData {
  username: string;
  profileImgUrl: string | null;
  jokeQueueJokes: JokeQueueJoke[];
  myJokesCount: number;
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);

  if (!user) {
    return redirect(`/login`);
  }

  const jokeService = new JokeService(user);
  const myJokesCount = await jokeService.getMyJokesCount();
  const jokeQueueJokes = await jokeService.getJokeQueueJokes();

  const data: LoaderData = {
    username: user.displayName,
    profileImgUrl: user.profileImgUrl,
    jokeQueueJokes,
    myJokesCount,
  };

  return data;
};

export default function __index() {
  const { username, profileImgUrl, jokeQueueJokes, myJokesCount } = useLoaderData<LoaderData>();
  const { type, state } = useTransition();

  return (
    <div className="flex flex-col h-full">
      <Header username={username} profileImgUrl={profileImgUrl} />
      <div className="flex flex-1 h-full">
        <div className="flex overflow-hidden relative z-0 flex-1">
          <aside className="hidden overflow-hidden relative shrink-0 w-full max-w-2xl border-r border-gray-200 xl:flex xl:flex-col xl:order-first">
            {/* Start secondary column (hidden on smaller screens) */}
            <div className="overflow-auto absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
              <h1 className="mb-4 text-2xl font-extrabold text-primary-900 sm:text-3xl">The Joke Queue</h1>
              <JokeQueue jokes={jokeQueueJokes} />
            </div>
            {/* End secondary column */}
          </aside>

          <main className="overflow-hidden relative z-0 flex-1 focus:outline-none xl:order-last">
            {/* Start main area*/}
            <div className="overflow-y-auto absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
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
