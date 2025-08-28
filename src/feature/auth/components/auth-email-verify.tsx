"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MailsIcon } from "@/components/ui/MailsIcon";
import { useSendEmail } from "@/hooks/auth/useAuthQuery";
import { useGetUser } from "@/hooks/user/useUserQuery";
import Link from "next/link";
import React from "react";
import { FcGoogle } from "react-icons/fc";

interface AuthEmailVerifyProps {
  email: string | undefined;
}

const AuthEmailVerify = ({ email }: AuthEmailVerifyProps) => {
  const user = useGetUser()
  console.log(user);
  
  const sendEmail = useSendEmail();
  return (
    <div>
      <Card className="min-w-xs sm:min-w-md mx-auto">
        <CardHeader className="flex flex-col justify-center items-center">
          <MailsIcon className="my-8" size={50} />
          <CardTitle className="text-xl text-center font-semibold">
            <p>You’re ready to go!</p>
            <p>Check your email to begin</p>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col justify-center items-center">
          <div className="flex text-sm flex-col justify-center items-center">
            <p>Almost there! We’ve sent a verification email to {email}</p>
            <p>
              Please click the link in the email to continue with 
              <span className="font-bold">Donezo.</span>
            </p>
          </div>
          <div className="w-full mt-10">
            <Button variant="outline" asChild className="w-full">
              <Link
                target="_blank"
                href="https://mail.google.com/mail/u/0/#inbox"
              >
                <span>
                  <FcGoogle />
                </span>
                Go Gmail
              </Link>
            </Button>
          </div>
        </CardContent>
        <CardFooter className="text-xs">
          <p>
            Didn’t receive the email verify?{" "}
            <span
              className="font-bold cursor-pointer"
              onClick={() => sendEmail.mutate()}
            >
              Resend code
            </span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthEmailVerify;
