import type { LoaderFunction } from "@remix-run/node";
import { JokeService } from "~/services/joke-service.server";
import { assertUser } from "~/utils/auth.server";
import { redirect } from "@remix-run/node";

export const action: LoaderFunction = async ({ request }) => {
  const user = await assertUser(request);

  const formData = await request.formData();
  const jokeId = Number(formData.get("id"));
  const queued = formData.get("queued") === "true";

  const jokeService = new JokeService(user);

  await jokeService.markJokeAsQueued(jokeId, queued);

  return redirect("/");
};
