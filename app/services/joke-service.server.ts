import { Joke } from "@prisma/client";
import { db } from "~/utils/db.server";

import { BaseService } from "~/services/base-service.server";

export interface DadJokeApiResponse {
  id: string;
  joke: string;
  status: number;
}

export class JokeService extends BaseService {
  private static DAD_JOKE_API_BASE_URL = "https://icanhazdadjoke.com";

  public static generateRandomJoke(): Promise<DadJokeApiResponse> {
    return fetch(this.DAD_JOKE_API_BASE_URL, {
      headers: {
        Accept: "application/json",
      },
    }).then((res) => res.json());
  }

  public createJoke(joke: { content: string; externalId?: string }): Promise<Joke> {
    return db.joke.create({
      data: {
        externalId: joke.externalId,
        content: joke.content,
        submitterId: this.user.id,
      },
    });
  }
}
