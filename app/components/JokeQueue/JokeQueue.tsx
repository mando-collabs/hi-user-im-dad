import React, { useCallback } from "react";
import { PlaceholderAvatar } from "~/components/PlaceholderAvatar";
import classNames from "classnames";
import { Button, IconButton } from "@mando-collabs/tailwind-ui";
import { CheckIcon, ReplyIcon } from "@heroicons/react/outline";
import { Form, useFetcher } from "@remix-run/react";
import type { QueuedJokesLoaderData } from "~/routes/api/jokes/queued";
import { usePusherEvent } from "~/hooks/use-pusher-event";
import type { JokeEventPayload } from "~/types/JokeEvent";
import { JokeEvent, JOKES_CHANNEL } from "~/types/JokeEvent";
import { useUpdateEffect } from "react-use";
import { RateJokeForm } from "~/components/RateJokeForm";
import type { RateEventPayload } from "~/types/RateEvent";
import { RATINGS_CHANNEL_NAME } from "~/types/RateEvent";
import { useOptimisticJokes } from "~/components/JokeQueue/use-optimistic-jokes";
import type { SerializedJokes } from "~/routes/__index";

export interface JokeQueueProps {
  jokes: SerializedJokes;
  userId: number;
}

function useFetchJokesQueue(ssrJokes: SerializedJokes) {
  const [baseJokes, setJokes] = React.useState(ssrJokes);

  const fetcher = useFetcher<QueuedJokesLoaderData>();
  const refresh = () => fetcher.load("/api/jokes/queued");

  useUpdateEffect(() => {
    setJokes(fetcher.data?.jokes ?? ssrJokes);
  }, [fetcher.data]);

  useUpdateEffect(() => {
    setJokes(ssrJokes);
  }, [ssrJokes]);

  const jokes = useOptimisticJokes(baseJokes);

  return { state: fetcher.state, jokes, refresh, setJokes };
}

export const JokeQueue: React.FC<JokeQueueProps> = ({ jokes: initialJokes, userId }) => {
  const { jokes, setJokes, refresh } = useFetchJokesQueue(initialJokes);

  usePusherEvent({ channelName: JOKES_CHANNEL }, (event: JokeEvent | string, payload: JokeEventPayload) => {
    if (payload.userId === userId) return;

    if (Object.keys(JokeEvent).includes(event)) {
      refresh();
    }
  });

  const updateJokeRatings = useCallback(
    (event: string, payload: RateEventPayload) => {
      if (payload.userId === userId) return;

      setJokes(
        jokes.map((joke) => {
          if (joke.id === payload.jokeId) {
            return { ...joke, ratings: payload.ratings };
          }
          return joke;
        })
      );
    },
    [jokes, setJokes, userId]
  );

  usePusherEvent({ channelName: RATINGS_CHANNEL_NAME }, updateJokeRatings);

  return (
    <div className="space-y-4">
      {jokes.length ? (
        jokes.map((joke) => (
          <div key={joke.id} className="flex items-start rounded-md border py-2 px-4 text-gray-700">
            {joke.profileImgUrl ? (
              <img
                className="h-6 w-6 rounded-full"
                src={joke.profileImgUrl}
                alt={joke.username}
                title={joke.username}
              />
            ) : (
              <PlaceholderAvatar className="h-6 w-6" username={joke.username} />
            )}
            <div className="flex w-full flex-col">
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
              {joke.delivered && (
                <RateJokeForm jokeId={joke.id} myRating={joke.myRating} ratings={joke.ratings} myJoke={joke.isMyJoke} />
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
