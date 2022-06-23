import React from "react";
import { PlaceholderAvatar } from "~/components/PlaceholderAvatar";
import classNames from "classnames";
import { Button, IconButton } from "@mando-collabs/tailwind-ui";
import { CheckIcon, ReplyIcon } from "@heroicons/react/outline";
import type { JokeQueueJoke } from "~/services/joke-service.server";
import { Form } from "@remix-run/react";
import { RateJokeForm } from "~/components/RateJokeForm";

export interface JokeQueueProps {
  jokes: JokeQueueJoke[];
}

export const JokeQueue: React.FC<JokeQueueProps> = ({ jokes }) => {
  return (
    <div className="space-y-4">
      {jokes.length ? (
        jokes.map((joke) => (
          <div key={joke.id} className="flex items-start py-2 px-4 text-gray-700 rounded-md border">
            {joke.profileImgUrl ? (
              <img
                className="w-6 h-6 rounded-full"
                src={joke.profileImgUrl}
                alt={joke.username}
                title={joke.username}
              />
            ) : (
              <PlaceholderAvatar className="w-6 h-6" username={joke.username} />
            )}
            <div className="flex flex-col w-full">
              <div className="flex w-full">
                <div className={classNames("ml-2 flex-1", { blur: !joke.delivered && !joke.isMyJoke })}>
                  {joke.content}
                </div>
                {joke.isMyJoke && !joke.delivered ? (
                  <div className="flex space-x-1">
                    <Form method="post" action="/api/jokes/delivered">
                      <input type="hidden" name="id" value={joke.id} />
                      <input type="hidden" name="delivered" value="true" />
                      <Button kind="white" size="xs" className="shrink-0" leadingIcon={CheckIcon}>
                        Delivered
                      </Button>
                    </Form>
                    <Form method="post" action="/api/jokes/queued">
                      <input type="hidden" name="id" value={joke.id} />
                      <input type="hidden" name="queued" value="false" />
                      <IconButton kind="white" size="xs" className="shrink-0" icon={ReplyIcon} />
                    </Form>
                  </div>
                ) : null}
              </div>
              {joke.deliveredAt ? (
                <span className="mt-2 ml-2 text-xs font-medium text-gray-500">
                  Delivered at {new Date(joke.deliveredAt).toLocaleString()}
                </span>
              ) : null}
              {!joke.isMyJoke && joke.delivered && (
                <RateJokeForm jokeId={joke.id} myRating={joke.myRating} ratings={joke.ratings} />
              )}
            </div>
          </div>
        ))
      ) : (
        <>No jokes yo</>
      )}
    </div>
  );
};
