import { z } from "zod";
import { withZod } from "@remix-validated-form/with-zod";
import { zfd } from "zod-form-data";

const addJokeFormSchema = z.object({
  content: zfd.text(z.string()),
  externalId: z.string().optional(),
});

export const addJokeFormValidator = withZod(addJokeFormSchema);
