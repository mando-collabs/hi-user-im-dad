import {LoaderFunction} from "@remix-run/node";
import {DadJokeApiResponse, DadJokeRepository} from "~/repositories/dad-joke.repository";
import {useLoaderData} from "@remix-run/react";

interface LoaderData {
  joke: DadJokeApiResponse
}

export const loader: LoaderFunction = async () => {
  const repository = new DadJokeRepository()
  const joke = await repository.getJoke()
  return { joke }
}

export default function Index() {
  const data = useLoaderData<LoaderData>()
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Hi User I'm Dad</h1>
      <p>
        here is a joke:
        <pre>
          {data.joke.joke}
        </pre>
      </p>
    </div>
  );
}
