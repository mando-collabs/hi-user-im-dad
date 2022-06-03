export interface DadJokeApiResponse {
  id: string;
  joke: string;
  status: number;
}

class JokeService {
  private DAD_JOKE_API_BASE_URL = "https://icanhazdadjoke.com";

  public generateRandomJoke(): Promise<DadJokeApiResponse> {
    return fetch(this.DAD_JOKE_API_BASE_URL, {
      headers: {
        Accept: "application/json",
      },
    }).then((res) => res.json());
  }
}
