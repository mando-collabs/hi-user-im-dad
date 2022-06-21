import classNames from "classnames";
import React from "react";
import { Link, useNavigate, useLocation } from "@remix-run/react";

export interface TabsProps {
  myJokesCount: number;
}

export const Tabs: React.FC<TabsProps> = ({ myJokesCount }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const tabs: { name: string; href: string; count?: number; current: boolean }[] = [
    { name: "Add a Joke", href: "/add-joke", current: pathname.includes("add-joke") },
    { name: "My Jokes", href: "/my-jokes", count: myJokesCount, current: pathname.includes("my-jokes") },
  ];

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block py-2 pr-10 pl-3 w-full text-base rounded-md border-gray-300 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
          defaultValue={tabs.find((tab) => tab.current)?.name}
          onChange={(e) => {
            const tab = tabs.find((tab) => tab.name === e.target.value);
            tab && navigate(tab.href);
          }}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                to={tab.href}
                className={classNames(
                  tab.current
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200",
                  "whitespace-nowrap flex py-4 px-1 border-b-2 font-medium text-sm"
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                {tab.name}
                {tab.count ? (
                  <span
                    className={classNames(
                      tab.current ? "bg-primary-100 text-primary-600" : "bg-gray-100 text-gray-900",
                      "hidden ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block"
                    )}
                  >
                    {tab.count}
                  </span>
                ) : null}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};
