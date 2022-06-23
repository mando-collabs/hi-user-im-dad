import type { LoaderFunction } from "@remix-run/node";
import type { DadJokeApiResponse } from "~/services/joke-service.server";
import { assertUser } from "~/utils/auth.server";
import { JokeService } from "~/services/joke-service.server";

export interface RandomJokeLoaderData {
  randomJoke: DadJokeApiResponse;
}

export const loader: LoaderFunction = async ({ request }): Promise<RandomJokeLoaderData | null> => {
  await assertUser(request);

  try {
    return { randomJoke: await JokeService.generateRandomJoke() };
  } catch (err) {
    return null;
  }
};
