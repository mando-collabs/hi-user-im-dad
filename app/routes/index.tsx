import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { authenticator } from "~/utils/auth.server";
import { useLoaderData } from "@remix-run/react";
import { Header } from "~/components/Header";

interface LoaderData {
  username: string;
  profileImgUrl: string | null;
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);

  if (!user) {
    return redirect(`/login`);
  }

  const data: LoaderData = {
    username: user.displayName,
    profileImgUrl: user.profileImgUrl,
  };

  return data;
};

export default function Index() {
  const { username, profileImgUrl } = useLoaderData<LoaderData>();

  return (
    <div className="flex flex-col">
      <Header username={username} profileImgUrl={profileImgUrl} />
      <div className="flex-1 flex h-full">
        <div className="flex overflow-hidden relative z-0 flex-1">
          <main className="overflow-y-auto relative z-0 flex-1 focus:outline-none xl:order-last">
            {/* Start main area*/}
            <div className="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
              <div className="h-full rounded-lg border-2 border-gray-200 border-dashed">{username}</div>
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
    </div>
  );
}
