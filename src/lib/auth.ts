import EmailTemplate from "@/feature/auth/components/email-template";
import { PrismaClient } from "@prisma/client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { openAPI } from "better-auth/plugins";
import React from "react";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY!);

const prisma = new PrismaClient();

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    async sendVerificationEmail({ user, url }) {
      const { data, error } = await resend.emails.send({
        from: "Todo comp <onboarding@resend.dev>",
        to: [user.email],
        subject: "Verify Email",
        react: React.createElement(EmailTemplate, {
          email: user.email,
          subject: "Verify Email",
          url: url,
        }),
      });

      if (error) {
        console.error("[RESEND] send error:", error);
        throw new Error(error.message || "Resend send failed");
      }

      if (!data?.id) {
        console.warn("[RESEND] No message id returned");
      }
    },
    autoSignInAfterVerification: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGEL_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      redirectURI: "http://localhost:3000/api/auth/callback/google",
    },
    facebook: {
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
      redirectURI: "http://localhost:3000/api/auth/callback/facebook",
      scope: ["email", "public_profile"],
    },
    github : {
      clientId : process.env.GITHUB_CLIENT_ID as string,
      clientSecret : process.env.GITHUB_CLIENT_SECRET as string,
      redirectURI : "http://localhost:3000/api/auth/callback/github"
    }
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  plugins: [openAPI()],
});
