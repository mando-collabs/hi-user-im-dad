import React from "react";
import { Button } from "@justinwaite/tailwind-ui";
import { RefreshIcon } from "@heroicons/react/outline";

export const RefreshRandomJokeForm: React.FC<{ className?: string; action: () => Promise<unknown> }> = ({
  className,
  action,
}) => {
  return (
    <Button leadingIcon={RefreshIcon} kind="secondary" onClick={() => action()}>
      <span className="sm:hidden">New Joke</span>
      <span className="hidden sm:block">Get New Joke</span>
    </Button>
  );
};
