
export interface DadJokeApiResponse {
  id: string;
  joke: string;
  status: number;
}

export class DadJokeRepository {

  private DAD_JOKE_API_BASE_URL = "https://icanhazdadjoke.com"

  public getJoke(): Promise<DadJokeApiResponse> {
    return fetch(this.DAD_JOKE_API_BASE_URL, {
      headers: {
        Accept: 'application/json'
      }
    }).then(res => res.json())
  }

  public getJokeById(id: string): Promise<DadJokeApiResponse> {
    return fetch(`${this.DAD_JOKE_API_BASE_URL}/j/${id}`, {
      headers: {
        Accept: 'application/json'
      }
    }).then(res => res.json())
  }
}
