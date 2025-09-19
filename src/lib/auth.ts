import EmailTemplate from "@/feature/auth/components/email-template";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { openAPI } from "better-auth/plugins";
import React from "react";
import { Resend } from "resend";
import { db } from "./db";
const resend = new Resend(process.env.RESEND_API_KEY!);


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
      redirectURI: "https://donez0.vercel.app/api/auth/callback/google",
    },
    github : {
      clientId : process.env.GITHUB_CLIENT_ID as string,
      clientSecret : process.env.GITHUB_CLIENT_SECRET as string,
      redirectURI : "https://donez0.vercel.app/api/auth/callback/github"
    }
  },
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  plugins: [openAPI()],
});
