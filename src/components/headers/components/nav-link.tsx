"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarDaysIcon, ClipboardList } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const DesktopNavlink = () => {
  const pathName = usePathname();

  console.log(pathName);

  const NAVLINK = [
    { title: "Task Board", href: "/", icon: <ClipboardList /> },
    { title: "Task Calendar", href: "/calendar", icon: <CalendarDaysIcon /> },
  ];

  return (
    <div className="flex gap-4">
      {NAVLINK.map((link, index) => (
        <Button
          key={index}
          variant={pathName === link.href ? "default" : "ghost"}
          asChild
        >
          <Link href={link.href}>
            {link.icon}
            <span className={cn("md:flex hidden" , pathName === link.href ? "" : "")}>{link.title}</span>
          </Link>
        </Button>
      ))}
    </div> 
  );
};

export default DesktopNavlink;
