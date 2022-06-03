/* This example requires Tailwind CSS v2.0+ */
import React from "react";

const navigation = [
  { name: "Solutions", href: "#" },
  { name: "Pricing", href: "#" },
  { name: "Docs", href: "#" },
  { name: "Company", href: "#" },
];

interface HeaderProps {
  username: string;
  profileImgUrl: string | null;
}

export const Header: React.FC<HeaderProps> = ({ username, profileImgUrl }) => {
  return (
    <header className="bg-primary-600">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-primary-500 lg:border-none">
          <div className="flex items-center">
            <a href="#">
              <span className="sr-only">Workflow</span>
              <img
                className="h-10 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
                alt=""
              />
            </a>
            <div className="hidden ml-10 space-x-8 lg:block">
              {navigation.map((link) => (
                <a key={link.name} href={link.href} className="text-base font-medium text-white hover:text-primary-50">
                  {link.name}
                </a>
              ))}
            </div>
          </div>
          <div className="ml-10 space-x-4">
            {profileImgUrl ? (
              <img className="inline-block h-12 w-12 rounded-full" src={profileImgUrl} alt={username} />
            ) : (
              <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </span>
            )}
          </div>
        </div>
        <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
          {navigation.map((link) => (
            <a key={link.name} href={link.href} className="text-base font-medium text-white hover:text-primary-50">
              {link.name}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
};
