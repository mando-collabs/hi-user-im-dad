import React from "react";
import { Button } from "@mando-collabs/tailwind-ui";
import { LightningBoltIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import { ValidatedForm } from "remix-validated-form";
import { rateJokeFormValidator } from "~/forms/rating-schemas";
import type { RootLoaderData } from "~/routes/__index";

type MyRating = RootLoaderData["jokeQueueJokes"][number]["myRating"];
type JokeRatings = RootLoaderData["jokeQueueJokes"][number]["ratings"];

export interface RateJokeFormProps {
  jokeId: number;
  myRating: MyRating;
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

export const RateJokeForm: React.FC<RateJokeFormProps> = ({ jokeId, className, myRating, ratings }) => {
  const formAction = `/api/jokes/${jokeId}/rate`;

  return (
    <ValidatedForm
      validator={rateJokeFormValidator}
      method="post"
      action={formAction}
      className={classNames(`flex flex-col ${className}`)}
    >
      <fieldset className="flex flex-row justify-between my-2">
        {ratingOptions.map((option) => (
          <JokeRatingFormGroup ratingOption={option} ratings={ratings} myRating={myRating} key={option.value} />
        ))}
      </fieldset>
      <Button type="submit" kind="primary" size="xs" leadingIcon={LightningBoltIcon}>
        Rate Joke
      </Button>
    </ValidatedForm>
  );
};

interface JokeRatingFormGroupProps {
  ratingOption: RatingOption;
  ratings: JokeRatings;
  myRating: MyRating;
}

const JokeRatingFormGroup: React.FC<JokeRatingFormGroupProps> = ({ ratingOption, ratings, myRating }) => {
  const matchedRating = ratings.find((rating) => rating.score === ratingOption.value);

  return (
    <label key={ratingOption.label} className="flex relative flex-col rounded cursor-pointer">
      <input
        type="radio"
        name="score"
        value={ratingOption.value}
        defaultChecked={myRating?.score === ratingOption.value}
        className="peer absolute z-20 opacity-0"
      />
      <div className="py-1 px-2 w-full h-full text-sm text-primary-500 peer-checked:text-white bg-primary-50 peer-checked:bg-primary-500 rounded">
        {matchedRating && <span className="mr-2 text-xs font-medium text-primary-800">{matchedRating.count}</span>}
        <span>{ratingOption.label}</span>
      </div>
    </label>
  );
};
