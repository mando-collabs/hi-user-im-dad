import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { JokeService } from "~/services/joke-service.server";
import { assertUser } from "~/utils/auth.server";
import { pusher } from "~/utils/pusher.server";
import { JokeEvent, JOKES_CHANNEL } from "~/types/JokeEvent";
import type { UseDataFunctionReturn } from "@remix-run/react/dist/components";

export type QueuedJokesLoaderData = UseDataFunctionReturn<typeof loader>;

export const loader: LoaderFunction = async ({ request }) => {
  const user = await assertUser(request);

  const jokeService = new JokeService(user);
  const jokes = await jokeService.getJokeQueueJokes();

  return json({ jokes });
};

export const action: ActionFunction = async ({ request }) => {
  const user = await assertUser(request);

  const formData = await request.formData();
  const jokeId = Number(formData.get("id"));
  const queued = formData.get("queued") === "true";

  const jokeService = new JokeService(user);

  await jokeService.markJokeAsQueued(jokeId, queued);

  const pusherEvent: JokeEvent = queued ? JokeEvent.queued : JokeEvent.dequeued;
  await pusher.trigger(JOKES_CHANNEL, pusherEvent, { jokeId, userId: user.id });

  return redirect("/");
};
