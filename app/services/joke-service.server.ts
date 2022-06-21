import type { Joke } from "@prisma/client";
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
  profileImgUrl: string | null;
  delivered: boolean;
  deliveredAt: Date | null;
  isMyJoke: boolean;
  queued: boolean;
}

export interface MyJoke {
  id: number;
  content: string;
  queued: boolean;
}

export class JokeService extends BaseService {
  private static DAD_JOKE_API_BASE_URL = "https://icanhazdadjoke.com";

  public static async generateRandomJoke(): Promise<DadJokeApiResponse> {
    const abortController = new AbortController();
    const timeoutId = setTimeout(() => abortController.abort(), 3000);

    const response = await fetch(this.DAD_JOKE_API_BASE_URL, {
      headers: {
        Accept: "application/json",
      },
      signal: abortController.signal,
    });

    clearTimeout(timeoutId);

    return await response.json();
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
      where: { queued: true },
      take: 15,
      orderBy: { queuedAt: "desc" },
      include: { submitter: { select: { displayName: true, profileImgUrl: true } } },
    });

    return jokes.map((joke) => {
      let isMyJoke = joke.submitterId === this.user.id;
      return {
        id: joke.id,
        content: joke.delivered || isMyJoke ? joke.content : any.sentence(),
        username: joke.submitter.displayName,
        profileImgUrl: joke.submitter.profileImgUrl,
        delivered: joke.delivered,
        deliveredAt: joke.deliveredAt,
        queued: joke.queued,
        isMyJoke,
      };
    });
  }

  public getMyJokes(): Promise<MyJoke[]> {
    return db.joke.findMany({
      where: { submitterId: this.user.id, queued: false },
      take: 50,
      orderBy: { createdAt: "desc" },
      select: { content: true, id: true, queued: true },
    });
  }

  public async markJokeAsDelivered(jokeId: number) {
    await db.joke.update({
      where: { id: jokeId },
      data: { delivered: true },
    });
  }

  public async markJokeAsQueued(jokeId: number, queued: boolean = true) {
    await db.joke.update({
      where: { id: jokeId },
      data: { queued, queuedAt: queued ? new Date() : null },
    });
  }
}
