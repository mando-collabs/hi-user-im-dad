import { LoaderFunction } from "@remix-run/remix";
import { authenticator } from "~/utils/auth.server";

export let loader: LoaderFunction = ({ request }) => {
  return authenticator.authenticate("github", request, {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
  });
};
