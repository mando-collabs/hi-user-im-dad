/* This example requires Tailwind CSS v2.0+ */
import React from "react";
import { Form } from "@remix-run/react";
import { Button } from "@justinwaite/tailwind-ui";
import { PlaceholderAvatar } from "~/components/PlaceholderAvatar";

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
      <nav className="px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex justify-between items-center py-6 w-full border-b border-primary-500 lg:border-none">
          <div className="flex items-center">
            <a href="#">
              <span className="sr-only">Workflow</span>
              <img
                className="w-auto h-10"
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
          <div className="flex items-center ml-10 space-x-4">
            {profileImgUrl ? (
              <img className="inline-block w-12 h-12 rounded-full" src={profileImgUrl} alt={username} />
            ) : (
              <PlaceholderAvatar className="w-12 h-12" />
            )}
            <Form method="post" action="/logout">
              <Button kind="white" type="submit">
                Logout
              </Button>
            </Form>
          </div>
        </div>
        <div className="flex flex-wrap justify-center py-4 space-x-6 lg:hidden">
          {navigation.map((link) => (
            <a key={link.name} href={link.href} className="text-base font-medium text-white hover:text-primary-50">
              {link.name}
            </a>
          ))}
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
