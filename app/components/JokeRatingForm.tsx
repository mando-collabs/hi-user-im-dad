import React from "react";
import { Form } from "@remix-run/react";
import { Button } from "@mando-collabs/tailwind-ui";
import { LightningBoltIcon } from "@heroicons/react/outline";
import classNames from "classnames";

export interface JokeRatingFormProps {
  jokeId: number;
  className?: string;
}

interface RatingValue {
  label: string;
  value: number;
}

const ratingValues: Array<RatingValue> = [
  { label: "Pain", value: 1 },
  { label: "Groan", value: 2 },
  { label: "Eye roll", value: 3 },
  { label: "Chuckle", value: 4 },
  { label: "Knee Slap", value: 5 },
];

export const JokeRatingForm: React.FC<JokeRatingFormProps> = ({ jokeId, className }) => {
  const formAction = `/api/jokes/${jokeId}/rate`;

  return (
    <Form method="post" action={formAction} className={classNames(`flex flex-col ${className}`)}>
      <fieldset className="flex flex-col gap-1 place-content-center my-2">
        <ul className="flex flex-row justify-between">
          {ratingValues.map((rating) => (
            <li key={rating.label} className="flex flex-col rounded">
              <label className="relative rounded cursor-pointer">
                <input type="radio" name="rating" value={rating.value} className="peer absolute z-20 opacity-0" />
                <span className="py-1 px-2 w-full h-full text-sm text-primary-500 peer-checked:text-white bg-primary-50 peer-checked:bg-primary-500 rounded">
                  {rating.label}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>
      <Button type="submit" kind="primary" size="xs" leadingIcon={LightningBoltIcon}>
        Rate Joke
      </Button>
    </Form>
  );
};
