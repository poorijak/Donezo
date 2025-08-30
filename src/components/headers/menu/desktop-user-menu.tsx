"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import { userType } from "@/types/user";
import UserAvatarSmall, { UserAvatar } from "../components/user-comp";
import { useSignOut } from "@/feature/auth/hooks/auth/useAuthQuery";

interface DesktopHeadersProp {
  user: userType | null;
}

const DesktopHeaders = ({ user }: DesktopHeadersProp) => {
  const signOut = useSignOut();

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="ghost" asChild>
            <UserAvatarSmall user={user} />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="center"
          sideOffset={4}
          className="flex justify-center flex-col items-center gap-3"
        >
          <DropdownMenuLabel className="flex flex-col gap-2 items-center">
            <UserAvatar user={user} />
            Hi 👋 {user?.name}
          </DropdownMenuLabel>
          <DropdownMenuItem asChild className="mb-3">
            <Button size="sm" onClick={() => signOut.mutate()}>
              Sign out
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DesktopHeaders;
