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
  title: string;
  value: number;
}

const ratingOptions: Array<RatingOption> = [
  { label: "😖", title: "Pain", value: 0 },
  { label: "😩", title: "Groan", value: 1 },
  { label: "🙄", title: "Eye Roll", value: 2 },
  { label: "🤭", title: "Chuckle", value: 3 },
  { label: "😆", title: "Knee Slap", value: 4 },
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
      <div
        className="
          flex
          items-center
          font-bold
          text-primary-500
          transition
          duration-300
          ease-elastic

          before:absolute
          before:right-full
          before:h-6
          before:w-6
          before:text-center
          before:content-[attr(data-count)]

          after:absolute
          after:-inset-x-1/2
          after:bottom-10
          after:rounded
          after:bg-primary-500
          after:text-center
          after:text-white

          hover:scale-125

          hover:after:p-1
          hover:after:content-[attr(data-title)]

          peer-checked:before:rounded-full
          peer-checked:before:bg-primary-500
          peer-checked:before:text-white

          peer-disabled:grayscale
        "
        data-count={matchedRating && matchedRating.count > 0 ? matchedRating.count : ""}
        data-title={ratingOption.title}
      >
        <span className="text-3xl">{ratingOption.label}</span>
      </div>
    </label>
  );
};
