import { appType } from "@/app/api/[[...route]]/route";
import { hc } from "hono/client";

// export const client = hc<appType>(process.env.NEXT_PUBLIC_VERCEL_URL!);
export const client = hc<appType>(process.env.NEXT_PUBLIC_BASE_URL!);
