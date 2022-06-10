import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { authenticator } from "~/utils/auth.server";
import { useLoaderData } from "@remix-run/react";
import { Header } from "~/components/Header";
import { AddJokeForm } from "~/components/AddJokeForm";
import { DadJokeApiResponse, JokeQueueJoke, JokeService } from "~/services/joke-service.server";
import { RandomJoke } from "~/components/RandomJoke";
import { Joke } from "@prisma/client";
import { JokeQueue } from "~/components/JokeQueue";

interface LoaderData {
  username: string;
  profileImgUrl: string | null;
  randomJoke: DadJokeApiResponse;
  jokeQueueJokes: JokeQueueJoke[];
  myJokes: Joke[];
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);

  if (!user) {
    return redirect(`/login`);
  }

  const jokeService = new JokeService(user);
  const randomJoke = await JokeService.generateRandomJoke();
  const jokeQueueJokes = await jokeService.getJokeQueueJokes();
  const myJokes = await jokeService.getMyJokes();

  const data: LoaderData = {
    username: user.displayName,
    profileImgUrl: user.profileImgUrl,
    randomJoke,
    jokeQueueJokes,
    myJokes,
  };

  return data;
};

export default function Index() {
  const { username, profileImgUrl, randomJoke, jokeQueueJokes, myJokes } = useLoaderData<LoaderData>();

  return (
    <div className="flex flex-col h-full">
      <Header username={username} profileImgUrl={profileImgUrl} />
      <div className="flex flex-1 h-full">
        <div className="flex overflow-hidden relative z-0 flex-1">
          <main className="overflow-y-auto relative z-0 flex-1 focus:outline-none xl:order-last">
            {/* Start main area*/}
            <div className="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
              <div className="h-full rounded-lg border-2 border-gray-200 border-dashed p-4 flex flex-col space-y-4">
                {" "}
                <AddJokeForm action="/api/jokes" />
                <RandomJoke action="/api/jokes" id={randomJoke.id} joke={randomJoke.joke} status={randomJoke.status} />
                <div>
                  My Jokes:
                  {myJokes.map((joke) => (
                    <div key={joke.id}>{joke.content}</div>
                  ))}
                </div>
              </div>
            </div>
            {/* End main area */}
          </main>
          <aside className="hidden overflow-hidden relative shrink-0 w-full max-w-2xl border-r border-gray-200 xl:flex xl:flex-col xl:order-first">
            {/* Start secondary column (hidden on smaller screens) */}
            <div className="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
              <JokeQueue jokes={jokeQueueJokes} />
            </div>
            {/* End secondary column */}
          </aside>
        </div>
      </div>
    </div>
  );
}
