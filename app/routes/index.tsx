import { LoaderFunction } from "@remix-run/node";
import {
  InboxIcon,
  ArchiveIcon,
  UserCircleIcon,
  FlagIcon,
  BanIcon,
  PencilAltIcon,
} from "@heroicons/react/outline";
import { getSession } from "~/session";

interface LoaderData {
  username: string;
}

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  console.log("What is a cookie? ", session);

  return { username: session.get("username") };
};

const sidebarNavigation = [
  { name: "Open", href: "#", icon: InboxIcon, current: true },
  { name: "Archive", href: "#", icon: ArchiveIcon, current: false },
  { name: "Customers", href: "#", icon: UserCircleIcon, current: false },
  { name: "Flagged", href: "#", icon: FlagIcon, current: false },
  { name: "Spam", href: "#", icon: BanIcon, current: false },
  { name: "Drafts", href: "#", icon: PencilAltIcon, current: false },
];

export default function Index() {
  return (
    <div className="h-full flex">
      <div className="flex-1 relative z-0 flex overflow-hidden">
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
          {/* Start main area*/}
          <div className="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
            <div className="h-full border-2 border-gray-200 border-dashed rounded-lg" />
          </div>
          {/* End main area */}
        </main>
        <aside className="hidden relative xl:order-first xl:flex xl:flex-col flex-shrink-0 max-w-2xl w-full border-r border-gray-200 overflow-y-auto">
          {/* Start secondary column (hidden on smaller screens) */}
          <div className="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
            <div className="h-full border-2 border-gray-200 border-dashed rounded-lg" />
          </div>
          {/* End secondary column */}
        </aside>
      </div>
    </div>
  );
}
