import { useQuery } from "react-query";
import { z } from "zod";
import type { RandomJokeLoaderData } from "../routes/api/jokes/random";

const RandomJokesQueryKeySchema = z.tuple([z.literal("random-jokes-query")]);

type RandomJokesQueryKey = z.infer<typeof RandomJokesQueryKeySchema>;

interface IRandomJokesQuery {
  queryKey: RandomJokesQueryKey;
}

export function useRandomJokeQuery(initialData: RandomJokeLoaderData) {
  const queryKey = RandomJokesQueryKeySchema.parse(["random-jokes-query"]);

  return useQuery(queryKey, randomJokeQuery, { initialData, refetchInterval: false });
}

function randomJokeQuery(_: IRandomJokesQuery): Promise<RandomJokeLoaderData> {
  return fetch("/api/jokes/random").then((res) => res.json());
}
