import React from "react";
import { Dropdown } from "@justinwaite/tailwind-ui";
import { Form } from "@remix-run/react";
import { PlaceholderAvatar } from "~/components/PlaceholderAvatar";

interface UserMenuProps {
  profileImgUrl: string | null;
  username: string;
}

export const UserMenu: React.FC<UserMenuProps> = ({ profileImgUrl, username }) => {
  return (
    <Dropdown>
      <Dropdown.Trigger>
        {profileImgUrl ? (
          <img className="inline-block w-10 h-10 rounded-full" src={profileImgUrl} alt={username} />
        ) : (
          <PlaceholderAvatar className="w-10 h-10" />
        )}
      </Dropdown.Trigger>
      <Dropdown.Items>
        <Form method="post" action="/logout">
          <Dropdown.Item as="button">Logout</Dropdown.Item>
        </Form>
      </Dropdown.Items>
    </Dropdown>
  );
};
