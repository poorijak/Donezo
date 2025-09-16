import { status } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getStatusColor = (status: status | undefined) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 , text-yellow-500";
      break;
    case "inProgress":
      return "bg-sky-100 text-sky-500";
      break;
    case "done":
      return "bg-green-100 , text-green-500";
      break;

    default:
      return "bg-yellow-100 text-yello-500";
  }
};

export const getTagsColor = (slug: string) => {
  switch (slug) {
    case "meeting":
      return "bg-indigo-100 text-indigo-500";
    case "travel":
      return "bg-orange-100 text-orange-500";
    case "personal":
      return "bg-violet-100 text-violet-500";
    case "study":
      return "bg-sky-200 text-sky-500";
    case "fitness":
      return "bg-orange-100 text-orange-500";
    case "countdown":
      return "bg-red-100 text-red-500";
    case "finance":
      return "bg-yellow-100 text-yellow-500";
    case "creative":
      return "bg-teal-100 text-teal-500";
    case "work":
      return "bg-gray-100 text-gray-500";
    case "shopping":
      return "bg-pink-100 text-pink-500";
    default:
      return "bg-gray-100 text-ra-500"; // fallback
  }
};
