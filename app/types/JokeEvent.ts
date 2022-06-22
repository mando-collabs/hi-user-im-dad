export const JOKES_CHANNEL = "jokes";

export enum JokeEvent {
  queued = "queued",
  dequeued = "dequeued",
  delivered = "delivered",
}

export interface JokeEventMessage {
  userId: number;
  jokeId: number;
}
