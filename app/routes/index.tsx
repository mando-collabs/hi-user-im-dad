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
import classNames from "classnames";
import { any } from "~/utils/any.server";
import { Button } from "@justinwaite/tailwind-ui";
import { CheckIcon } from "@heroicons/react/outline";

interface LoaderData {
  username: string;
  profileImgUrl: string | null;
  randomJoke: DadJokeApiResponse;
  jokeQueue: {
    id: number;
    content: string;
    userImg: string | null;
    username: string;
    delivered: boolean;
    isMyJoke: boolean;
  }[];
  myJokes: Joke[];
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);

  if (!user) {
    return redirect(`/login`);
  }

  const randomJoke = await JokeService.generateRandomJoke();
  const jokeQueue = await db.joke.findMany({
    take: 15,
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
    jokeQueue: jokeQueue.map((joke) => {
      let isMyJoke = joke.submitterId === user.id;
      return {
        id: joke.id,
        content: joke.delivered || isMyJoke ? joke.content : any.sentence(),
        username: joke.submitter.displayName,
        userImg: joke.submitter.profileImgUrl,
        delivered: joke.delivered,
        isMyJoke,
      };
    }),
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
          <aside className="hidden overflow-hidden relative shrink-0 w-full max-w-2xl border-r border-gray-200 xl:flex xl:flex-col xl:order-first">
            {/* Start secondary column (hidden on smaller screens) */}
            <div className="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
              <div className="h-full space-y-4 p-4 overflow-y-auto">
                <h1 className="text-3xl font-extrabold">The Joke Queue</h1>
                {jokeQueue.map((joke) => (
                  <div key={joke.id} className="flex items-start text-gray-700 border rounded-md px-4 py-2">
                    {joke.userImg ? (
                      <img
                        className="h-6 w-6 rounded-full"
                        src={joke.userImg}
                        alt={joke.username}
                        title={joke.username}
                      />
                    ) : (
                      <PlaceholderAvatar className="h-6 w-6" />
                    )}
                    <div className={classNames("ml-2", { blur: !joke.delivered && !joke.isMyJoke })}>
                      {joke.content}
                    </div>
                    <span className="flex-1" />
                    {joke.isMyJoke ? (
                      <Button kind="white" size="xs" className="flex-shrink-0" leadingIcon={CheckIcon}>
                        Delivered
                      </Button>
                    ) : null}
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
