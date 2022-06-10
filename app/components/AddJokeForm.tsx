import React from "react";
import { RVFButton, RVFTextArea } from "@justinwaite/tailwind-ui";
import { ValidatedForm } from "remix-validated-form";
import { useActionData } from "@remix-run/react";
import { Joke } from "@prisma/client";

import { addJokeFormValidator } from "~/form-schemas/joke-schemas";
import { FormComponentProps } from "~/types/FormComponentProps";

export const AddJokeForm: React.FC<FormComponentProps> = ({ action, method = "post" }) => {
  const newJoke = useActionData<Joke>();
  return (
    <>
      <ValidatedForm id="id" method={method} validator={addJokeFormValidator} action={action}>
        <RVFTextArea label="Add a new joke" name="content" />
        <div className="flex justify-end mt-2">
          <RVFButton>Submit</RVFButton>
        </div>
      </ValidatedForm>
      {newJoke && (
        <p>
          New joke: <pre>{JSON.stringify(newJoke)}</pre>
        </p>
      )}
    </>
  );
};
