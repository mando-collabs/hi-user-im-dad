import { RefreshRandomJokeForm, useRefreshRandomJoke } from "~/components/RefreshRandomJokeForm";
import { RandomJokeForm } from "~/components/RandomJokeForm";
import { AddJokeForm } from "~/components/AddJokeForm";
import React from "react";
import type { LoaderFunction } from "@remix-run/node";
import type { DadJokeApiResponse } from "~/services/joke-service.server";
import { JokeService } from "~/services/joke-service.server";
import { useLoaderData } from "@remix-run/react";

interface LoaderData {
  randomJoke: DadJokeApiResponse | null;
}

export const loader: LoaderFunction = async ({ request }) => {
  let randomJoke: DadJokeApiResponse | null = null;
  try {
    randomJoke = await JokeService.generateRandomJoke();
  } catch (err) {
    console.error("Fetching random joke failed", err);
  }

  const data: LoaderData = { randomJoke };

  return data;
};

export default function AddJoke() {
  const loaderData = useLoaderData<LoaderData>();

  const { randomJoke, isLoading, refresh } = useRefreshRandomJoke(loaderData.randomJoke);

  return (
    <>
      <div className="mb-4 flex items-end justify-between">
        <h1 className="text-2xl font-extrabold text-primary-900 sm:text-3xl">
          <span className="sm:hidden">Random joke</span>
          <span className="hidden sm:inline">A Random Dad Joke</span>
        </h1>
        <RefreshRandomJokeForm action={refresh} isLoading={isLoading} />
      </div>
      {randomJoke ? (
        <RandomJokeForm action="/api/jokes" id={randomJoke.id} joke={randomJoke.joke} status={randomJoke.status} />
      ) : (
        <div className="rounded-md border border-red-500 bg-red-50 p-4">
          <p className="font-medium text-red-800">Random jokes are unavailable at this time. Sorry ☹️</p>
        </div>
      )}
      <h1 className="mt-8 text-2xl font-extrabold text-primary-900 sm:text-3xl">Add Your Own Joke</h1>
      <AddJokeForm className="mt-4" action="/api/jokes" />
    </>
  );
}
