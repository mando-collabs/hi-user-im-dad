import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { assertUser } from "~/utils/auth.server";
import { z } from "zod";
import type { Validator } from "remix-validated-form";
import { validationError } from "remix-validated-form";
import { rateJokeFormValidator } from "~/forms/rating-schemas";
import { RatingsService } from "~/services/ratings-service.server";
import { zfd } from "zod-form-data";
import { withZod } from "@remix-validated-form/with-zod";
import type { Params } from "react-router";

const paramValidator = withZod(
  z.object({
    id: zfd.numeric(z.number().int()),
  })
);

async function validateAction<T>(request: Request, params: Params, validator: Validator<T>) {
  const paramsResult = await paramValidator.validate(params);
  if (paramsResult.error) {
    throw validationError(paramsResult.error);
  }

  const validationResult = await validator.validate(await request.formData());

  if (validationResult.error) {
    throw validationError(validationResult.error);
  }

  return { ...paramsResult.data, ...validationResult.data };
}

export const action: ActionFunction = async ({ request, params }) => {
  const user = await assertUser(request);
  const validationResult = await validateAction(request, params, rateJokeFormValidator);

  const rating = {
    jokeId: validationResult.id,
    score: validationResult.score,
  };

  const ratingService = new RatingsService(user);

  await ratingService.upsertRating(rating);

  return redirect("/");
};
