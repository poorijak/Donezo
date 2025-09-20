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
import { UserAvatar } from "../components/user-comp";
import { useSignOut } from "@/feature/auth/hooks/auth/useAuthQuery";
import { MenuIcon } from "@/components/ui/MenuIcon";
import SubmitBtn from "@/components/shared/submit-btn";

interface MobileUserMenuProps {
  user: userType | null;
}

const MobileUserMenu = ({ user }: MobileUserMenuProps) => {
  const { mutate, isPending } = useSignOut();

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
          className="flex flex-col items-center justify-center"
        >
          <DropdownMenuLabel className="flex flex-col items-center gap-2 text-xs">
            <UserAvatar user={user} />
            <p>
              {" "}
              Hi 👋 <span className="font-bold">{user?.name}</span>
            </p>
          </DropdownMenuLabel>
          <DropdownMenuItem asChild className="mb-3">
            <SubmitBtn title="Sign out" size="sm" pending={isPending} onClick={() => mutate()} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MobileUserMenu;
