import React from "react";
import { PlaceholderAvatar } from "~/components/PlaceholderAvatar";
import classNames from "classnames";
import { Button } from "@justinwaite/tailwind-ui";
import { CheckIcon } from "@heroicons/react/outline";
import { JokeQueueJoke } from "~/services/joke-service.server";

export interface JokeQueueProps {
  jokes: JokeQueueJoke[];
}

export const JokeQueue: React.FC<JokeQueueProps> = ({ jokes }) => {
  return (
    <div className="h-full space-y-4 p-4 overflow-y-auto">
      <h1 className="text-3xl font-extrabold">The Joke Queue</h1>
      {jokes.map((joke) => (
        <div key={joke.id} className="flex items-start text-gray-700 border rounded-md px-4 py-2">
          {joke.profileImgUrl ? (
            <img className="h-6 w-6 rounded-full" src={joke.profileImgUrl} alt={joke.username} title={joke.username} />
          ) : (
            <PlaceholderAvatar className="h-6 w-6" />
          )}
          <div className={classNames("ml-2 flex-1", { blur: !joke.delivered && !joke.isMyJoke })}>{joke.content}</div>
          {joke.isMyJoke ? (
            <Button kind="white" size="xs" className="flex-shrink-0" leadingIcon={CheckIcon}>
              Delivered
            </Button>
          ) : null}
        </div>
      ))}
    </div>
  );
};
