import type { LoaderFunction } from "@remix-run/node";
import { JokeService } from "~/services/joke-service.server";
import { assertUser } from "~/utils/auth.server";
import { redirect } from "@remix-run/node";
import { JokeEvent, JOKES_CHANNEL } from "~/types/JokeEvent";
import { pusher } from "~/utils/pusher.server";

export const action: LoaderFunction = async ({ request }) => {
  const user = await assertUser(request);

  const jokeId = Number((await request.formData()).get("id"));

  const jokeService = new JokeService(user);

  await jokeService.markJokeAsDelivered(jokeId);

  await pusher.trigger(JOKES_CHANNEL, JokeEvent.delivered, { jokeId, userId: user.id });

  return redirect("/");
};
