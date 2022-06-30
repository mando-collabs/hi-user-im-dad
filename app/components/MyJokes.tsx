import type { MyJoke } from "~/services/joke-service.server";
import { IconButton } from "@mando-collabs/tailwind-ui";
import { ReplyIcon, TrashIcon } from "@heroicons/react/outline";
import { Form } from "@remix-run/react";

import React from "react";

interface MyJokesProps {
  jokes: MyJoke[];
}

export const MyJokes: React.FC<MyJokesProps> = ({ jokes }) => {
  return (
    <div className="space-y-4">
      {jokes.map((joke) => (
        <div key={joke.id} className="flex items-start space-x-2 rounded-md border py-2 px-4 text-gray-700">
          <div className="flex flex-1 flex-col">
            <p>{joke.content}</p>
            <span className="text-xs font-medium text-gray-500">{new Date(joke.createdAt).toLocaleString()}</span>
          </div>

          <Form method="post" action="/api/jokes/queued">
            <input type="hidden" name="id" value={joke.id} />
            <input type="hidden" name="queued" value="true" />
            <div title="Move to queue">
              <IconButton kind="white" size="xs" className="shrink-0" icon={ReplyIcon} />
            </div>
          </Form>

          <Form method="delete" action={`/api/jokes/${joke.id}`}>
            <IconButton type="submit" kind="white" size="xs" className="shrink-0" icon={TrashIcon} />
          </Form>
        </div>
      ))}
    </div>
  );
};
