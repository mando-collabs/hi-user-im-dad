import React, { createContext } from "react";
import Pusher from "pusher-js";

const PusherContext = createContext<Pusher | null>(null);

export const PusherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pusherAppKey, pusherAppCluster } = window.ENV;
  const [pusher] = React.useState<Pusher>(() => {
    console.log("establishing pusher connection");
    return new Pusher(pusherAppKey, { cluster: pusherAppCluster });
  });

  return <PusherContext.Provider value={pusher}>{children}</PusherContext.Provider>;
};

export function usePusher(): Pusher | null {
  return React.useContext(PusherContext);
}
