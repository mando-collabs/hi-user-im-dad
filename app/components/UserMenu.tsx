import React from "react";
import { Dropdown } from "@mando-collabs/tailwind-ui";
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
          <img className="inline-block h-10 w-10 rounded-full" src={profileImgUrl} alt={username} />
        ) : (
          <PlaceholderAvatar className="h-10 w-10" />
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
