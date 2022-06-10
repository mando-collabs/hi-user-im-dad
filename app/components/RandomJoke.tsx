import React from "react";
import { DadJokeApiResponse } from "~/services/joke-service.server";
import { Form } from "@remix-run/react";
import { RVFButton, Button } from "@justinwaite/tailwind-ui";
import { addJokeFormValidator } from "~/form-schemas/joke-schemas";
import { ValidatedForm } from "remix-validated-form";
import { FormComponentProps } from "~/types/FormComponentProps";

export const RandomJoke: React.FC<DadJokeApiResponse & FormComponentProps> = ({ joke, id, action, method }) => {
  return (
    <>
      <ValidatedForm method="post" validator={addJokeFormValidator} action={action}>
        <div>{joke}</div>
        <input type="hidden" name="content" value={joke} />
        <input type="hidden" name="externalId" value={id} />
        <RVFButton>Use Joke</RVFButton>
        <br />
      </ValidatedForm>
      <Form>
        <Button kind="secondary" type="submit">
          Get New Joke
        </Button>
      </Form>
    </>
  );
};
