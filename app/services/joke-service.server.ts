import { Joke } from "@prisma/client";
import { db } from "~/utils/db.server";

import { BaseService } from "~/services/base-service.server";
import { any } from "~/utils/any.server";

export interface DadJokeApiResponse {
  id: string;
  joke: string;
  status: number;
}

export interface JokeQueueJoke {
  id: number;
  content: string;
  username: string;
  profileImgUrl?: string;
  delivered: boolean;
  isMyJoke: boolean;
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

  public async getJokeQueueJokes(): Promise<JokeQueueJoke[]> {
    const jokes = await db.joke.findMany({
      take: 15,
      orderBy: { createdAt: "desc" },
      include: { submitter: { select: { displayName: true, profileImgUrl: true } } },
    });

    return jokes.map((joke) => {
      let isMyJoke = joke.submitterId === this.user.id;
      return {
        id: joke.id,
        content: joke.delivered || isMyJoke ? joke.content : any.sentence(),
        username: joke.submitter.displayName,
        userImg: joke.submitter.profileImgUrl,
        delivered: joke.delivered,
        isMyJoke,
      };
    });
  }

  public getMyJokes() {
    return db.joke.findMany({
      where: { submitterId: this.user.id },
      take: 10,
      orderBy: { createdAt: "asc" },
    });
  }
}
