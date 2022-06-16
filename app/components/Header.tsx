/* This example requires Tailwind CSS v2.0+ */
import React from "react";
import { Form, Link } from "@remix-run/react";
import { Button } from "@justinwaite/tailwind-ui";
import { UserMenu } from "~/components/UserMenu";

interface HeaderProps {
  username: string;
  profileImgUrl: string | null;
}

export const Header: React.FC<HeaderProps> = ({ username, profileImgUrl }) => {
  return (
    <header className="bg-white border-b-4 border-primary-600">
      <nav className="px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex justify-between items-center py-6 w-full">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src="/images/dad-jokes-logo.png" className="mr-4 w-14 h-14" alt="dad jokes" />
              <h1 className="text-2xl font-extrabold text-primary-900 sm:text-3xl">Hello, User, I'm Dad</h1>
            </Link>
          </div>
          <div className="flex shrink-0 items-center ml-10 space-x-4">
            <UserMenu profileImgUrl={profileImgUrl} username={username} />
          </div>
        </div>
      </nav>
    </header>
  );
};
