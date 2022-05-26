import { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async () => {
  return {};
};

export default function WhosYourDaddyModal() {
  return (
    <form method="post" action="/user">
      <input
        type="text"
        placeholder="Enter a Display Name"
        name="displayName"
      />
      <input type="email" placeholder="Enter an Email" name="email" />
      <button type="submit">Submit</button>
    </form>
  );
}
