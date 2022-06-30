/* This example requires Tailwind CSS v2.0+ */
import React from "react";
import { Link } from "@remix-run/react";
import { UserMenu } from "~/components/UserMenu";

interface HeaderProps {
  username: string;
  profileImgUrl: string | null;
}

export const Header: React.FC<HeaderProps> = ({ username, profileImgUrl }) => {
  return (
    <header className="border-b-4 border-primary-600 bg-white">
      <nav className="px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between py-6">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src="/images/dad-jokes-logo.png" className="mr-4 h-14 w-14" alt="dad jokes" />
              <h1 className="text-2xl font-extrabold text-primary-900 sm:text-3xl">Hello, User, I'm Dad</h1>
            </Link>
          </div>
          <div className="ml-10 flex shrink-0 items-center space-x-4">
            <UserMenu profileImgUrl={profileImgUrl} username={username} />
          </div>
        </div>
      </nav>
    </header>
  );
};
