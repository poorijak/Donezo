import { auth } from "@/lib/auth";
import { authType } from "@/type/auth";
import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";

export const mustAuth = createMiddleware<{
   Variables : {
    user: ReturnType<authType>["user"]
   }
}>(async (c , next) => {
    const session = await auth.api.getSession({ headers : c.req.raw.headers})

    if (!session) {
        throw new HTTPException(401 , { message : "Unauthorized"})
    }

    c.set("user" , session.user)
    await next()

})