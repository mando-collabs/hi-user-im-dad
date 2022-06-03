import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { getSession } from "~/utils/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  console.log("What is a cookie? ", session);

  //TODO check for github token or something?
  const username = session.get("username");
  if (username) {
    return { username: session.get("username") };
  } else {
    return redirect(`/login`);
  }
};

export default function Index() {
  return (
    <div className="flex h-full">
      <div className="flex overflow-hidden relative z-0 flex-1">
        <main className="overflow-y-auto relative z-0 flex-1 focus:outline-none xl:order-last">
          {/* Start main area*/}
          <div className="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
            <div className="h-full rounded-lg border-2 border-gray-200 border-dashed" />
          </div>
          {/* End main area */}
        </main>
        <aside className="hidden overflow-y-auto relative shrink-0 w-full max-w-2xl border-r border-gray-200 xl:flex xl:flex-col xl:order-first">
          {/* Start secondary column (hidden on smaller screens) */}
          <div className="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
            <div className="h-full rounded-lg border-2 border-gray-200 border-dashed" />
          </div>
          {/* End secondary column */}
        </aside>
      </div>
    </div>
  );
}
