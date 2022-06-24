export enum RateEvent {
  ratingUpdated = "ratingUpdated",
}

export interface RateEventPayload {
  jokeId: number;
  userId: number;
  ratings: { count: number; score: number }[];
}

export const RATINGS_CHANNEL_NAME = "ratings";
