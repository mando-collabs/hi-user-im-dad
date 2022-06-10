import React from "react";
import { Button } from "@justinwaite/tailwind-ui";
import { RefreshIcon } from "@heroicons/react/outline";
import { Form } from "@remix-run/react";
import classNames from "classnames";

export const RefreshRandomJokeForm: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <Form className={classNames("ml-4", className)}>
      <Button leadingIcon={RefreshIcon} kind="secondary" type="submit">
        Get New Joke
      </Button>
    </Form>
  );
};
