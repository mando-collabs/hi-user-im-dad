import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { authenticator } from "~/utils/auth.server";
import { useLoaderData } from "@remix-run/react";
import { Header } from "~/components/Header";
import { AddJokeForm } from "~/components/AddJokeForm";
import { DadJokeApiResponse, JokeService } from "~/services/joke-service.server";
import { RandomJoke } from "~/components/RandomJoke";
import { db } from "~/utils/db.server";
import { Joke } from "@prisma/client";
import { PlaceholderAvatar } from "~/components/PlaceholderAvatar";

interface LoaderData {
  username: string;
  profileImgUrl: string | null;
  randomJoke: DadJokeApiResponse;
  jokeQueue: { id: number; content: string; userImg: string | null; username: string }[];
  myJokes: Joke[];
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);

  if (!user) {
    return redirect(`/login`);
  }

  const randomJoke = await JokeService.generateRandomJoke();
  const jokeQueue = await db.joke.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
    include: { submitter: { select: { displayName: true, profileImgUrl: true } } },
  });
  const myJokes = await db.joke.findMany({
    where: { submitterId: user.id },
    take: 10,
    orderBy: { createdAt: "asc" },
  });

  const data: LoaderData = {
    username: user.displayName,
    profileImgUrl: user.profileImgUrl,
    randomJoke,
    jokeQueue: jokeQueue.map((joke) => ({
      id: joke.id,
      content: joke.content,
      username: joke.submitter.displayName,
      userImg: joke.submitter.profileImgUrl,
    })),
    myJokes,
  };

  return data;
};

export default function Index() {
  const { username, profileImgUrl, randomJoke, jokeQueue } = useLoaderData<LoaderData>();

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
                  {jokeQueue.map((joke) => (
                    <div key={joke.id}>{joke.content}</div>
                  ))}
                </div>
              </div>
            </div>
            {/* End main area */}
          </main>
          <aside className="hidden overflow-y-auto relative shrink-0 w-full max-w-2xl border-r border-gray-200 xl:flex xl:flex-col xl:order-first">
            {/* Start secondary column (hidden on smaller screens) */}
            <div className="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
              <div className="h-full rounded-lg border-2 border-gray-200 border-dashed space-y-4 p-4">
                {jokeQueue.map((joke) => (
                  <div key={joke.id} className="flex items-start">
                    {joke.userImg ? (
                      <img className="h-6 w-6 rounded-full" src={joke.userImg} />
                    ) : (
                      <PlaceholderAvatar className="h-6 w-6" />
                    )}
                    <div className="ml-2">{joke.content}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* End secondary column */}
          </aside>
        </div>
      </div>
    </div>
  );
}
