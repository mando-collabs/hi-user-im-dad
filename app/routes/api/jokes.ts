import { ActionFunction, redirect } from "@remix-run/node";
import { assertUser } from "~/utils/auth.server";
import { validationError, Validator } from "remix-validated-form";
import { addJokeFormValidator } from "~/form-schemas/joke-schemas";
import { JokeService } from "~/services/joke-service.server";

async function validateAction<T>(request: Request, validator: Validator<T>) {
  const validationResult = await validator.validate(await request.formData());

  if (validationResult.error) {
    throw validationError(validationResult.error);
  }

  return validationResult;
}

export const action: ActionFunction = async ({ request }) => {
  const user = await assertUser(request);
  const validationResult = await validateAction(request, addJokeFormValidator);
  const jokeService = new JokeService(user);

  await jokeService.createJoke(validationResult.data);

  return redirect("/");
};
