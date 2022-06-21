import type { LoaderFunction } from "@remix-run/node";
import type { MyJoke } from "~/services/joke-service.server";
import { JokeService } from "~/services/joke-service.server";
import { assertUser } from "~/utils/auth.server";
import { useLoaderData } from "@remix-run/react";
import { MyJokes } from "~/components/MyJokes";

interface LoaderData {
  myJokes: MyJoke[];
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await assertUser(request);

  const jokeService = new JokeService(user);
  const myJokes = await jokeService.getMyJokes();

  const data: LoaderData = { myJokes };

  return data;
};

export default function MyJokesTab() {
  const { myJokes } = useLoaderData<LoaderData>();
  return (
    <div>
      {myJokes.length ? (
        <MyJokes jokes={myJokes} />
      ) : (
        <div className="p-4 text-gray-500">You don't have any jokes yet.</div>
      )}
    </div>
  );
}
