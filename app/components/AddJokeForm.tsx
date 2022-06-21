import React from "react";
import { RVFButton, RVFTextArea } from "@justinwaite/tailwind-ui";
import { ValidatedForm } from "remix-validated-form";
import { useActionData } from "@remix-run/react";
import type { Joke } from "@prisma/client";

import { addJokeFormValidator } from "~/form-schemas/joke-schemas";
import type { FormComponentProps } from "~/types/FormComponentProps";

export const AddJokeForm: React.FC<FormComponentProps & { className?: string }> = ({
  className,
  action,
  method = "post",
}) => {
  const newJoke = useActionData<Joke>();
  return (
    <>
      <ValidatedForm
        className={className}
        id="new-joke"
        method={method}
        validator={addJokeFormValidator}
        action={action}
      >
        <RVFTextArea label="Your hilarious joke" name="content" />
        <RVFButton className="mt-2">Add to my queue</RVFButton>
      </ValidatedForm>
      {newJoke && (
        <p>
          New joke: <pre>{JSON.stringify(newJoke)}</pre>
        </p>
      )}
    </>
  );
};
