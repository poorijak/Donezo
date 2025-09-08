import { status } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getStatusColor = (status: status) => {
  switch (status) {
    case "pending":
      return "bg-yellow-400";
      break;
    case "inProgress":
      return "bg-sky-400";
      break;
    case "done":
      return "bg-green-500";
      break;

    default :
    return "bg-yellow-500"
  }
};
