import type { ActionFunction } from "@remix-run/node";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { assertUser } from "~/utils/auth.server";
import { JokeService } from "~/services/joke-service.server";
import { redirect } from "@remix-run/node";

export const action: ActionFunction = async ({ request, params }) => {
  const user = await assertUser(request);
  const jokeService = new JokeService(user);
  const jokeId = params.id ? +params.id : null;

  if (!jokeId) {
    throw new Response(null, { status: StatusCodes.BAD_REQUEST, statusText: ReasonPhrases.BAD_REQUEST });
  }

  if (request.method.toLowerCase() === "delete") {
    await jokeService.deleteJoke(jokeId);
  } else {
    throw new Response(null, { status: StatusCodes.METHOD_NOT_ALLOWED, statusText: ReasonPhrases.METHOD_NOT_ALLOWED });
  }

  return redirect("/");
};
