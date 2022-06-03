import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { authenticator } from "~/utils/auth.server";

export let loader: LoaderFunction = () => redirect("/login");

export let action: ActionFunction = ({ request }) => {
  return authenticator.authenticate("github", request, { successRedirect: "/" });
};
