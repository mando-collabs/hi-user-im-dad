import { useFetchers } from "@remix-run/react";
import { useMemo } from "react";
import { JOKE_RATING_FORM_ACTION_KEY } from "~/components/RateJokeForm";
import type { SerializedJokes } from "~/routes/__index";

export function useOptimisticJokes(jokes: SerializedJokes) {
  const fetchers = useFetchers();
  const ratingsFetchers = useMemo(() => {
    return fetchers.filter((f) => f.submission?.action.endsWith(JOKE_RATING_FORM_ACTION_KEY));
  }, [fetchers]);

  const myFetchers = new Map<number, number>();
  ratingsFetchers.forEach((fetcher) => {
    if (fetcher?.submission && (fetcher.state === "submitting" || fetcher.state === "loading")) {
      const jokeId = fetcher.submission.formData.get("jokeId") as string;
      myFetchers.set(parseInt(jokeId), parseInt(fetcher.submission.formData.get("score") as string));
    }
  });

  if (myFetchers.size === 0) {
    // no fetchers, return existing jokes array
    return jokes;
  }

  return jokes.map((joke) => {
    const submittedJokeScore = myFetchers.get(joke.id);
    // This joke's rating was not changed
    if (submittedJokeScore === undefined) return joke;

    const updatedRatings = joke.ratings.map((rating) => {
      // This was my previous score, decrement the count
      if (rating.score === joke.myRating?.score) {
        return { ...rating, count: rating.count - 1 };
      }
      // This is the new score, increase the count
      if (rating.score === submittedJokeScore) {
        return { ...rating, count: rating.count + 1 };
      }
      // This score was not changed
      return rating;
    });
    // We aren't always guaranteed to have one of each score per joke
    // in that case, the updatedRatings may be missing the entry for the new score.
    // If it doesn't exist, push it on to the end of the ratings array
    if (updatedRatings.every((rating) => rating.score !== submittedJokeScore)) {
      updatedRatings.push({ score: submittedJokeScore, count: 1 });
    }

    return { ...joke, ratings: updatedRatings };
  });
}
