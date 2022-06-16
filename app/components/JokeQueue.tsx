import React from "react";
import { PlaceholderAvatar } from "~/components/PlaceholderAvatar";
import classNames from "classnames";
import { Button } from "@justinwaite/tailwind-ui";
import { CheckIcon } from "@heroicons/react/outline";
import type { JokeQueueJoke } from "~/services/joke-service.server";

export interface JokeQueueProps {
  jokes: JokeQueueJoke[];
}

export const JokeQueue: React.FC<JokeQueueProps> = ({ jokes }) => {
  return (
    <div className="space-y-4">
      {jokes.map((joke) => (
        <div key={joke.id} className="flex items-start py-2 px-4 text-gray-700 rounded-md border">
          {joke.profileImgUrl ? (
            <img className="w-6 h-6 rounded-full" src={joke.profileImgUrl} alt={joke.username} title={joke.username} />
          ) : (
            <PlaceholderAvatar className="w-6 h-6" />
          )}
          <div className={classNames("ml-2 flex-1", { blur: !joke.delivered && !joke.isMyJoke })}>{joke.content}</div>
          {joke.isMyJoke ? (
            <Button kind="white" size="xs" className="shrink-0" leadingIcon={CheckIcon}>
              Delivered
            </Button>
          ) : null}
        </div>
      ))}
    </div>
  );
};
