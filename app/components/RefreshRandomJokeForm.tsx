import React from "react";
import { Button } from "@justinwaite/tailwind-ui";
import { RefreshIcon } from "@heroicons/react/outline";
import { Form } from "@remix-run/react";
import classNames from "classnames";

export const RefreshRandomJokeForm: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <Form className={classNames("ml-4 shrink-0", className)}>
      <Button leadingIcon={RefreshIcon} kind="secondary" type="submit">
        <span className="sm:hidden">New Joke</span>
        <span className="hidden sm:block">Get New Joke</span>
      </Button>
    </Form>
  );
};
