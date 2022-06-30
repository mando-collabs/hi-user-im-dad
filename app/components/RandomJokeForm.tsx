import React from "react";
import type { DadJokeApiResponse } from "~/services/joke-service.server";
import { RVFButton } from "@mando-collabs/tailwind-ui";
import { addJokeFormValidator } from "~/forms/joke-schemas";
import { ValidatedForm } from "remix-validated-form";
import type { FormComponentProps } from "~/types/FormComponentProps";
import { PlusIcon } from "@heroicons/react/outline";

export const RandomJokeForm: React.FC<DadJokeApiResponse & FormComponentProps> = ({ joke, id, action, method }) => {
  return (
    <div className="rounded-md bg-primary-100 p-4 text-primary-900 shadow">
      <ValidatedForm method="post" validator={addJokeFormValidator} action={action}>
        <div className="text-xl font-bold">{joke}</div>
        <input type="hidden" name="content" value={joke} />
        <input type="hidden" name="externalId" value={id} />

        <RVFButton className="mt-4" kind="primary" leadingIcon={PlusIcon}>
          Add to my queue
        </RVFButton>
      </ValidatedForm>
    </div>
  );
};
