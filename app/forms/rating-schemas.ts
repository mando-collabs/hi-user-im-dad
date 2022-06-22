import { z } from "zod";
import { zfd } from "zod-form-data";
import { withZod } from "@remix-validated-form/with-zod";

const rateJokeFormSchema = zfd.formData({
  score: zfd.numeric(z.number().int().min(0).max(4)),
});

export const rateJokeFormValidator = withZod(rateJokeFormSchema);
