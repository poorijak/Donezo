import React from "react";
import { Skeleton } from "../ui/skeleton";

const SkeletonTask = () => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center gap-3 rounded-md border border-gray-100 px-4 py-4">
        <div className="flex flex-col gap-3">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[40px]" />
          <Skeleton className="h-4 w-[80px]" />
        </div>
      </div>
      <div className="flex items-center gap-3 rounded-md border border-gray-100 px-4 py-4">
        <div className="flex flex-col gap-3">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[40px]" />
          <Skeleton className="h-4 w-[80px]" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonTask;
