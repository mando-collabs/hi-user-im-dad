import { ClientOnly } from "remix-utils";
import React from "react";

export const ClientOnlyProvider: React.FC<{
  children: React.ReactNode;
  provider: React.ComponentType<{ children?: React.ReactNode }>;
}> = ({ children, provider: Provider }) => {
  return <ClientOnly children={() => <Provider>{children}</Provider>} fallback={children} />;
};
