import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { assertUser } from "~/utils/auth.server";
import { z } from "zod";
import type { Validator } from "remix-validated-form";
import { validationError } from "remix-validated-form";
import { rateJokeFormValidator } from "~/forms/rating-schemas";
import { RatingsService } from "~/services/ratings-service.server";
import { zfd } from "zod-form-data";

async function validateAction<T>(request: Request, validator: Validator<T>) {
  const validationResult = await validator.validate(await request.formData());

  if (validationResult.error) {
    throw validationError(validationResult.error);
  }
  return validationResult;
}

export const action: ActionFunction = async ({ request, params }) => {
  const user = await assertUser(request);
  const jokeId = zfd.numeric(z.number().int()).parse(params.id);
  const validationResult = await validateAction(request, rateJokeFormValidator);
  const rating = {
    jokeId,
    ...validationResult.data,
  };

  const ratingService = new RatingsService(user);

  await ratingService.upsertRating(rating);

  return redirect("/");
};
