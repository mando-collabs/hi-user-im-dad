import { usePusher } from "~/components/PusherProvider";
import { useEffectOnce } from "react-use";

interface UsePusherEventParams {
  channelName: string;
  eventName?: string;
}

export function usePusherEvent<T extends unknown[] = unknown[]>(
  { channelName, eventName }: UsePusherEventParams,
  callback: (...args: T) => void
) {
  const pusher = usePusher();

  useEffectOnce(() => {
    if (!pusher) return;

    const channel = pusher.subscribe(channelName);

    if (eventName) {
      channel.bind(eventName, callback);
    } else {
      channel.bind_global(callback);
    }

    return () => {
      channel.unsubscribe();
    };
  });
}
