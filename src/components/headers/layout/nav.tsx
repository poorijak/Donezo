import React from "react";
import DesktopHeaders from "../menu/desktop-user-menu";
import { userType } from "@/types/user";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DesktopNavlink from "../components/nav-link";
import MobileUserMenu from "../menu/mobile-user-menu";

interface NavbarProps {
  user: userType | null;
}

const Navbar = ({ user }: NavbarProps) => {
  return (
    <nav>
      <div className="md:hidden flex">
        <MobileUserMenu user={user} />
      </div>
      <div className="justify-between items-center w-full md:flex hidden">
        {user ? (
          <DesktopHeaders user={user} />
        ) : (
          <Button variant="outline" asChild>
            <Link href={"/auth/signin"}>Sign in</Link>
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
