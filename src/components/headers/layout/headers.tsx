import React from "react";
import Navbar from "./nav";
import { userType } from "@/types/user";
import DesktopNavlink from "../components/nav-link";
import Link from "next/link";

interface HeaderUserProps {
  user: userType | null;
}

const HeaderUser = ({ user }: HeaderUserProps) => {
  return (
    <div className="fixed top-0 inset-x-0 z-50">
      <div className="max-w-7xl flex justify-between mx-auto items-center px-4 md:px-8 h-16">
        <h1 className="font-bold text-xl">
          <Link href="/">
            Done
            <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              zo
            </span>
          </Link>
        </h1>

        <DesktopNavlink />
        <Navbar user={user} />
      </div>
    </div>
  );
};

export default HeaderUser;
