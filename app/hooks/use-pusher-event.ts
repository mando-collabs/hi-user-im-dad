import { usePusher } from "~/components/PusherProvider";
import { useEffect, useState } from "react";
import type { Channel } from "pusher-js";

interface UsePusherEventParams {
  channelName: string;
  eventName?: string;
}

export function usePusherEvent<T extends unknown[] = unknown[]>(
  { channelName, eventName }: UsePusherEventParams,
  callback: (...args: T) => void
) {
  const pusher = usePusher();
  const [channel, setChannel] = useState<Channel | null>(null);

  useEffect(() => {
    if (!pusher) return setChannel(null);

    const c = pusher.subscribe(channelName);

    setChannel(c);

    return () => {
      c?.unsubscribe();
    };
  }, [pusher, channelName]);

  useEffect(() => {
    if (!channel) return;

    if (eventName) {
      channel.bind(eventName, callback);
    } else {
      channel.bind_global(callback);
    }

    return () => {
      channel.unbind_all();
    };
  }, [channel, eventName, callback]);
}
