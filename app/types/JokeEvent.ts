export const JOKES_CHANNEL = "jokes";

export enum JokeEvent {
  queued = "queued",
  dequeued = "dequeued",
  delivered = "delivered",
}

export interface JokeEventPayload {
  userId: number;
  jokeId: number;
}
