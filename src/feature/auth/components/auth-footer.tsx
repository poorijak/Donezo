import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useSigninWithSocial } from "@/feature/auth/hooks/auth/useAuthQuery";

interface AuthfooterProps {
  type: "signin" | "signup";
}

const authTextMap = {
  signin: {
    footerText: "Don't have an account?",
    linkText: "Sign up",
    linkHref: "/auth/signup",
  },
  signup: {
    footerText: "Have an account?",
    linkText: "Sign in",
    linkHref: "/auth/signin",
  },
};

const authProvider = [
  {
    provider: "google",
    icon: <FcGoogle />,
    label: {
      mobile: "Google",
      desktop: "Sign in with Google",
    },
  },
  {
    provider: "github",
    icon: <FaGithub />,
    label: {
      mobile: "Github",
      desktop: "Sign in with Github",
    },
  },
];

const AuthFooter = ({ type }: AuthfooterProps) => {
  const signinSocial = useSigninWithSocial();
  const { footerText, linkHref, linkText } = authTextMap[type];

  const handleSubmit = (value: string) => {
    signinSocial.mutate({
      provider: value,
    });
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center gap-5">
        <div className="h-px flex-1 bg-gray-300"></div>
        <span className="text-xs text-gray-400  font-bold">OR</span>
        <div className="h-px flex-1 bg-gray-300"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
        {authProvider.map((p, index) => (
          <Button
            variant="outline"
            className="w-full flex items-center justify-center"
            key={index}
            onClick={() => handleSubmit(p.provider)}
          >
            {p.icon}
            <p>
              <span className="hidden md:block">{p.label.desktop}</span>
              <span className="block md:hidden">{p.label.mobile}</span>
            </p>
          </Button>
        ))}
      </div>

      <div className="flex flex-col text-sm gap-2 font-medium justify-center items-center">
        {type === "signin" && (
          <Link href={`/auth/forget-password`}>Forgot password?</Link>
        )}
        <p className="text-muted-foreground">
          {footerText}{" "}
          <Link className="text-primary" href={linkHref}>
            {linkText}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthFooter;
