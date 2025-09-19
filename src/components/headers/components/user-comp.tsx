"use client";

import { Avatar , AvatarImage } from "@/components/ui/avatar";
import { userType } from "@/types/user";
import React from "react";

interface userTypeComp {
  user: userType | null;
}

export const UserAvatar = ({ user }: userTypeComp) => (
  <Avatar className="size-16">
    <AvatarImage
      src={user?.image || "/No-user-profile.jpeg"}
      alt={user?.name || "user avatar"}
    />
  </Avatar>
);

const UserAvatarSmall = ({ user }: userTypeComp) => (
  <div>
    <Avatar>
      <AvatarImage
        src={user?.image || "/No-user-profile.jpeg"}
        alt={user?.name || "user avatar"}
      />
    </Avatar>
  </div>
);

export default UserAvatarSmall;
