import { Button } from "@/components/ui/button";
import React from "react";
import CreateTaskBTN from "../task/components/create-task-btn";
import Link from "next/link";
import Image from "next/image";

const Landing = () => {
  return (
    <div className="relative flex min-h-svh items-center justify-center">
      <div className="relative flex flex-col items-center justify-center gap-12">
        <div className="flex flex-col items-center gap-2 text-4xl">
          <h1 className="font-semibold md:text-6xl">Your tasks, your time</h1>
          <h2 className="text- text-muted-foreground/40 font-semibold">
            perfectly aligned.
          </h2>
        </div>

        <div className="flex flex-col items-center gap-4">
          <p className="font-medium">Turn Tasks Into a Clear Calendar Plan</p>
          <Button>
            <Link href={"/task"}>Click 🫵🏻 to add your task now!</Link>
          </Button>
        </div>
      </div>

      <Image
        src={"/Frame_27.png"}
        alt="asset imgae"
        width={250}
        height={250}
        className="absolute top-20 left-0 hidden h-[175px] w-[150px] md:left-0 md:block md:h-[300px] md:w-[250px]"
      />
      <Image
        src={"/pink.png"}
        alt="asset imgae"
        width={200}
        height={200}
        className="absolute top-20 hidden  right-0 h-[175px] w-[150px] md:block md:h-[350px] md:w-[250px]"
      />
      <Image
        src={"/folder2.png"}
        alt="asset imgae"
        width={250}
        height={250}
        className="absolute bottom-0 left-0 hidden h-[75px] w-[150px] md:block md:h-[120px] md:w-[250px]"
      />
      <Image
        src={"/folder1.png"}
        alt="asset imgae"
        width={250}
        height={250}
        className="absolute right-0 bottom-0 hidden h-[75px] w-[150px] md:right-10 md:block md:h-[100px] md:w-[250px]"
      />
    </div>
  );
};

export default Landing;
