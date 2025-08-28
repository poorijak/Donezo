"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { userType } from "@/types/user";
import React from "react";

interface userTypeComp {
  user: userType | null;
}

export const UserAvatar = ({ user }: userTypeComp) => (
  <Avatar className="size-16">
    <AvatarImage
      src={user?.image || "/no-user-profile.jpeg"}
      alt={user?.name || "user avatar"}
    />
  </Avatar>
);

const UserAvatarSmall = ({ user }: userTypeComp) => (
  <div>
    <Avatar>
      <AvatarImage
        src={user?.image || "/no-user-profile.jpeg"}
        alt={user?.name || "user avatar"}
      />
    </Avatar>
  </div>
);

export default UserAvatarSmall;
