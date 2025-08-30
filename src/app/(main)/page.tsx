import { Button } from "@/components/ui/button";
import CreateTaskBTN from "@/feature/task/components/create-task-btn";
import { authCheck } from "@/lib/routeGuard";
import React from "react";

const page = async() => {
  const user = await authCheck();
  return (
    <div className="flex mx-auto justify-center items-center">
      <div className="flex justify-center items-center gap-5 flex-col">
        <h1 className="text-3xl font-bold">
          Create your{" "}
          <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
            Task{" "}
          </span>
          ✨
        </h1>

        <CreateTaskBTN user={user}/>
      </div>
    </div>
  );
};

export default page;
