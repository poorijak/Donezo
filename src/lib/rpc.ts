import { appType } from "@/app/api/[[...route]]/route";
import { hc } from "hono/client";


export const client  = hc<appType>(`${process.env.BETTER_AUTH_URL!}/api`)