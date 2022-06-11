/* This example requires Tailwind CSS v2.0+ */
import React from "react";
import { Form, Link } from "@remix-run/react";
import { Button } from "@justinwaite/tailwind-ui";
import { PlaceholderAvatar } from "~/components/PlaceholderAvatar";

interface HeaderProps {
  username: string;
  profileImgUrl: string | null;
}

export const Header: React.FC<HeaderProps> = ({ username, profileImgUrl }) => {
  return (
    <header className="bg-white border-b-4 border-primary-600">
      <nav className="px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex justify-between items-center py-6 w-full border-b border-primary-500 lg:border-none">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src="/images/dad-jokes-logo.png" className="mr-4 w-14 h-14" alt="dad jokes" />
              <h1 className="text-3xl font-extrabold text-white">Hello, User, I'm Dad</h1>
            </Link>
          </div>
          <div className="flex items-center ml-10 space-x-4">
            {profileImgUrl ? (
              <img className="inline-block w-10 h-10 rounded-full" src={profileImgUrl} alt={username} />
            ) : (
              <PlaceholderAvatar className="w-10 h-10" />
            )}
            <Form method="post" action="/logout">
              <Button kind="white" type="submit">
                Logout
              </Button>
            </Form>
          </div>
        </div>
        <div className="flex flex-wrap justify-center py-4 space-x-6 lg:hidden">
          <Form method="post" action="/logout">
            <Button kind="white" type="submit">
              Logout
            </Button>
          </Form>
        </div>
      </nav>
    </header>
  );
};
