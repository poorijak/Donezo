"use client";
import { authClient } from "@/lib/auth-client";
import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { error } from "console";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface signinType {
  email: string;
  password: string;
}

interface signupType {
  email: string;
  name: string;
  password: string;
}

export const useSigninWithEmail = () => {
  const route = useRouter();
  const queryClinet = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ email, password }: signinType) => {
      const { error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
      });
      if (error) {
        throw new Error(error.message);
      }
    },

    onSuccess: () => {
      toast.success("Sign in successfuly!");
      queryClinet.invalidateQueries({ queryKey: ["user"] });
      route.push("/");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return mutation;
};

export const useSignupWithEmail = () => {
  const queryClinet = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async ({ email, name, password }: signupType) => {
      const { data, error } = await authClient.signUp.email({
        email,
        name,
        password,
      });

      if (!data) {
        throw new Error(error.message);
      }
    },

    onSuccess: () => {
      queryClinet.invalidateQueries({ queryKey: ["user"] });
      toast.success("Sign up successfuly! Please verify your email");
      router.push("/auth/email-verify");
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return mutation;
};

export const useSendEmail = () => {
  const mutation = useMutation({
    mutationFn: async () => {
      const res = await client.api.auth["send-verification-email"].$post();
      if (!res.ok) {
        const data = (await res.json()) as { error?: string; message?: string };
        throw new Error(
          data.error || data.message || "Failed to send veriftication email"
        );
      }

      return res;
    },
    onSuccess: () => {
      toast.success("Verification email sent!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return mutation;
};

export const useSigninWithSocial = () => {
  const queryClinet = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      provider,
    }: {
      provider: string;
      callbackURL?: string;
    }) => {
      const res = await authClient.signIn.social({
        provider: provider,
        callbackURL: "/",
      });

      if (res.error) {
        throw new Error(res.error.message);
      }

      return res;
    },

    onSuccess: () => {
      queryClinet.invalidateQueries({ queryKey: ["user"] });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });
  return mutation;
};

export const useSignOut = () => {
  const route = useRouter()
  const queryClinet = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await authClient.signOut();

      if (!res.data) {
        throw new Error("Sign out faild");
      }
    },
    onSuccess: () => {
      queryClinet.invalidateQueries({ queryKey: ["user"] });
      route.push("/auth/signin")
      
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });
  return mutation
};
