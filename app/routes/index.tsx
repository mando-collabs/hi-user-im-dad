import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { authenticator } from "~/utils/auth.server";
import { Form, useLoaderData } from "@remix-run/react";
import { Header } from "~/components/Header";
import { AddJokeForm } from "~/components/AddJokeForm";
import type { DadJokeApiResponse, JokeQueueJoke } from "~/services/joke-service.server";
import { JokeService } from "~/services/joke-service.server";
import { RandomJokeForm } from "~/components/RandomJokeForm";
import type { Joke } from "@prisma/client";
import { JokeQueue } from "~/components/JokeQueue";
import React from "react";
import { Button } from "@justinwaite/tailwind-ui";
import { RefreshIcon } from "@heroicons/react/outline";
import { RefreshRandomJokeForm } from "~/components/RefreshRandomJokeForm";

interface LoaderData {
  username: string;
  profileImgUrl: string | null;
  randomJoke: DadJokeApiResponse;
  jokeQueueJokes: JokeQueueJoke[];
  myJokes: Joke[];
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);

  if (!user) {
    return redirect(`/login`);
  }

  const jokeService = new JokeService(user);
  const randomJoke = await JokeService.generateRandomJoke();
  const jokeQueueJokes = await jokeService.getJokeQueueJokes();
  const myJokes = await jokeService.getMyJokes();

  const data: LoaderData = {
    username: user.displayName,
    profileImgUrl: user.profileImgUrl,
    randomJoke,
    jokeQueueJokes,
    myJokes,
  };

  return data;
};

export default function Index() {
  const { username, profileImgUrl, randomJoke, jokeQueueJokes, myJokes } = useLoaderData<LoaderData>();

  return (
    <div className="flex flex-col h-full">
      <Header username={username} profileImgUrl={profileImgUrl} />
      <div className="flex flex-1 h-full">
        <div className="flex overflow-hidden relative z-0 flex-1">
          <main className="overflow-y-auto relative z-0 flex-1 focus:outline-none xl:order-last">
            {/* Start main area*/}
            <div className="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-end mb-4">
                <h1 className="text-2xl font-extrabold text-primary-900 sm:text-3xl">
                  <span className="sm:hidden">Random joke</span>
                  <span className="hidden sm:inline">A Random Dad Joke</span>
                </h1>
                <RefreshRandomJokeForm />
              </div>
              <RandomJokeForm
                action="/api/jokes"
                id={randomJoke.id}
                joke={randomJoke.joke}
                status={randomJoke.status}
              />

              <h1 className="mt-8 text-2xl font-extrabold text-primary-900 sm:text-3xl">Add Your Own Joke</h1>
              <AddJokeForm className="mt-4" action="/api/jokes" />

              <h1 className="mt-8 text-2xl font-extrabold text-primary-900 sm:text-3xl">My Joke Queue</h1>
              <div>
                My Jokes:
                {myJokes.map((joke) => (
                  <div key={joke.id}>{joke.content}</div>
                ))}
              </div>
            </div>
            {/* End main area */}
          </main>
          <aside className="hidden overflow-hidden relative shrink-0 w-full max-w-2xl border-r border-gray-200 xl:flex xl:flex-col xl:order-first">
            {/* Start secondary column (hidden on smaller screens) */}
            <div className="overflow-auto absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
              <h1 className="mb-4 text-2xl font-extrabold text-primary-900 sm:text-3xl">The Joke Queue</h1>
              <JokeQueue jokes={jokeQueueJokes} />
            </div>
            {/* End secondary column */}
          </aside>
        </div>
      </div>
    </div>
  );
}
