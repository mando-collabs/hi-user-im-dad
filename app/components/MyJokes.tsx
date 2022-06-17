import { MyJoke } from "~/services/joke-service.server";
import { IconButton } from "@justinwaite/tailwind-ui";
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
        <div key={joke.id} className="flex items-start py-2 px-4 text-gray-700 rounded-md border space-x-2">
          <div className="flex-1">{joke.content}</div>
          {!joke.queued ? (
            <Form method="post" action="api/jokes/queued">
              <input type="hidden" name="id" value={joke.id} />
              <input type="hidden" name="queued" value="true" />
              <div title="Move to queue">
                <IconButton kind="white" size="xs" className="shrink-0" icon={ReplyIcon} />
              </div>
            </Form>
          ) : null}
          <IconButton kind="white" size="xs" className="shrink-0" icon={TrashIcon} />
        </div>
      ))}
    </div>
  );
};
