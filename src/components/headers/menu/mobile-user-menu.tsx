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
import Link from "next/link";
import Image from "next/image";
import UserAvatarSmall, { UserAvatar } from "../components/user-comp";
import { useSignOut } from "@/hooks/auth/useAuthQuery";
import { MenuIcon } from "@/components/ui/MenuIcon";

interface MobileUserMenuProps {
  user: userType | null;
}

const MobileUserMenu = ({ user }: MobileUserMenuProps) => {
  const signOut = useSignOut();

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="ghost" asChild>
            <MenuIcon />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          sideOffset={5}
          className="flex justify-center flex-col items-center "
        >
          <DropdownMenuLabel className="flex flex-col gap-2 items-center text-xs">
            <UserAvatar user={user} />
            <p>
              {" "}
              Hi 👋 <span className="font-bold">{user?.name}</span>
            </p>
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

export default MobileUserMenu;
