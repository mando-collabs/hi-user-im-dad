import React from "react";
import { Button } from "@justinwaite/tailwind-ui";
import { RefreshIcon } from "@heroicons/react/outline";
import { useFetcher } from "@remix-run/react";
import type { RandomJokeLoaderData } from "~/routes/api/jokes/random";
import type { DadJokeApiResponse } from "~/services/joke-service.server";

interface RefreshRandomJokeFormProps {
  action: () => void;
  className?: string;
  isLoading?: boolean;
}

export function useRefreshRandomJoke(initialData: DadJokeApiResponse | null) {
  const randomJokeFetcher = useFetcher<RandomJokeLoaderData>();
  const isLoading = randomJokeFetcher.state === "loading";
  const randomJoke = randomJokeFetcher.data?.randomJoke ?? initialData;
  const refresh = () => randomJokeFetcher.load("/api/jokes/random");
  return { isLoading, randomJoke, refresh };
}

export const RefreshRandomJokeForm: React.FC<RefreshRandomJokeFormProps> = ({ className, action, isLoading }) => {
  return (
    <Button
      className={isLoading ? "animate-spin" : undefined}
      leadingIcon={RefreshIcon}
      leadingIconClassName={isLoading ? "animate-reverse-spin" : undefined}
      kind="secondary"
      onClick={action}
      loading={isLoading}
    >
      <span className="sm:hidden">New Joke</span>
      <span className="hidden sm:block">Get New Joke</span>
    </Button>
  );
};
