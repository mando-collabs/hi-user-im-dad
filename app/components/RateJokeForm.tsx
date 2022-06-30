import type { ChangeEventHandler } from "react";
import React from "react";
import classNames from "classnames";
import type { RootLoaderData } from "~/routes/__index";
import type { FetcherWithComponents } from "@remix-run/react";
import { useFetcher } from "@remix-run/react";

type MyRating = RootLoaderData["jokeQueueJokes"][number]["myRating"];
type JokeRatings = RootLoaderData["jokeQueueJokes"][number]["ratings"];

export interface RateJokeFormProps {
  jokeId: number;
  myRating: MyRating;
  myJoke: boolean;
  ratings: JokeRatings;
  className?: string;
}

interface RatingOption {
  label: string;
  value: number;
}

const ratingOptions: Array<RatingOption> = [
  { label: "Pain", value: 0 },
  { label: "Groan", value: 1 },
  { label: "Eye roll", value: 2 },
  { label: "Chuckle", value: 3 },
  { label: "Knee Slap", value: 4 },
];

export const RateJokeForm: React.FC<RateJokeFormProps> = ({ jokeId, className, myRating, myJoke, ratings }) => {
  const formAction = `/api/jokes/${jokeId}/rate`;
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="post" action={formAction} className={classNames(`flex flex-col ${className}`)}>
      <fieldset className="my-2 flex flex-row justify-between" disabled={myJoke}>
        {ratingOptions.map((option) => (
          <JokeRatingFormGroup
            ratingOption={option}
            ratings={ratings}
            myRating={myRating}
            key={option.value}
            fetcher={fetcher}
            jokeId={jokeId}
          />
        ))}
      </fieldset>
    </fetcher.Form>
  );
};

interface JokeRatingFormGroupProps {
  jokeId: number;
  ratingOption: RatingOption;
  ratings: JokeRatings;
  myRating: MyRating;
  fetcher: FetcherWithComponents<unknown>;
}

export const JOKE_RATING_FORM_ACTION_KEY = "/rate";

const JokeRatingFormGroup: React.FC<JokeRatingFormGroupProps> = ({
  ratingOption,
  ratings,
  myRating,
  fetcher,
  jokeId,
}) => {
  const matchedRating = ratings.find((rating) => rating.score === ratingOption.value);
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => fetcher.submit(e.target.form);

  return (
    <label key={ratingOption.label} className="group relative flex cursor-pointer flex-col rounded">
      <input
        type="radio"
        name="score"
        value={ratingOption.value}
        defaultChecked={myRating?.score === ratingOption.value}
        onChange={onChange}
        className="peer absolute z-20 opacity-0"
      />
      <input type="hidden" value={jokeId} name="jokeId" />
      <div className="h-full w-full rounded bg-primary-50 py-1 px-2 text-sm text-primary-500 peer-checked:bg-primary-500 peer-checked:text-white peer-disabled:bg-sky-300 peer-disabled:text-white">
        {matchedRating && matchedRating.count > 0 && (
          <span className="mr-2 text-xs font-medium text-primary-900">{matchedRating.count}</span>
        )}
        <span>{ratingOption.label}</span>
      </div>
    </label>
  );
};
