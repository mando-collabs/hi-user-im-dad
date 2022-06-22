import React from "react";
import { Button } from "@mando-collabs/tailwind-ui";
import { LightningBoltIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import { ValidatedForm } from "remix-validated-form";
import { rateJokeFormValidator } from "~/forms/rating-schemas";

export interface JokeRatingFormProps {
  jokeId: number;
  className?: string;
}

interface RatingValue {
  label: string;
  value: number;
}

const ratingValues: Array<RatingValue> = [
  { label: "Pain", value: 0 },
  { label: "Groan", value: 1 },
  { label: "Eye roll", value: 2 },
  { label: "Chuckle", value: 3 },
  { label: "Knee Slap", value: 4 },
];

export const RateJokeForm: React.FC<JokeRatingFormProps> = ({ jokeId, className }) => {
  const formAction = `/api/jokes/${jokeId}/rate`;

  return (
    <ValidatedForm
      validator={rateJokeFormValidator}
      method="post"
      action={formAction}
      className={classNames(`flex flex-col ${className}`)}
    >
      <fieldset className="flex flex-row justify-between my-2">
        {ratingValues.map((rating) => (
          <label key={rating.label} className="flex relative flex-col rounded cursor-pointer">
            <input type="radio" name="score" value={rating.value} className="peer absolute z-20 opacity-0" />
            <span className="py-1 px-2 w-full h-full text-sm text-primary-500 peer-checked:text-white bg-primary-50 peer-checked:bg-primary-500 rounded">
              {rating.label}
            </span>
          </label>
        ))}
      </fieldset>
      <Button type="submit" kind="primary" size="xs" leadingIcon={LightningBoltIcon}>
        Rate Joke
      </Button>
    </ValidatedForm>
  );
};
