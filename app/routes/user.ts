import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { commitSession, getSession } from "~/utils/session.server";

export const action: ActionFunction = async ({ request }) => {
  const body = await request.formData();
  const session = await getSession(request.headers.get("Cookie"));

  const user = {
    displayName: body.get("displayName"),
    email: body.get("email"),
  };
  session.set("username", user.displayName);

  //TODO add user to db
  //TODO add userId to cookie

  return redirect(`/`, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};
