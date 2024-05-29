import { createKindeServerClient, GrantType, type SessionManager, type UserType } from "@kinde-oss/kinde-typescript-sdk";
import { getCookie, setCookie, deleteCookie } from "hono/cookie";
import { type Context } from "hono";
//type context is to access 'c' object in the session manager
import { createMiddleware } from 'hono/factory';

// Client for authorization code flow
export const kindeClient = createKindeServerClient(GrantType.AUTHORIZATION_CODE, {
    authDomain: process.env.KINDE_DOMAIN!,
    clientId: process.env.KINDE_CLIENT_ID!,
    clientSecret: process.env.KINDE_CLIENT_SECRET!,
    redirectURL: process.env.KINDE_REDIRECT_URI!,
    logoutRedirectURL: process.env.KINDE_LOGOUT_REDIRECT_URI!,
});



let store: Record<string, unknown> = {};

//session manager will take the context and return the session manager object
export const sessionManager = (c: Context): SessionManager => ({
    //get value for a particular key 'cookie'
    async getSessionItem(key: string) {
        const result = getCookie(c, key);
        return result;
    },
    //set value for a new key in 'cookie' 
    async setSessionItem(key: string, value: unknown) {
        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "Lax", //remove CSRF attacks
        } as const;
        if (typeof value === "string") {
            setCookie(c, key, value, cookieOptions);
        } else {
            setCookie(c, key, JSON.stringify(value), cookieOptions);
        }
    },
    //remove a particular key from 'cookie'
    async removeSessionItem(key: string) {
        deleteCookie(c, key);
    },
    //destroy the session and remove all major cookies
    async destroySession() {
        ["id_token", "access_token", "user", "refresh_token"].forEach((key) => {
            deleteCookie(c, key);
        });
    },
});


//----------------auth middleware-----------------
// for authenticatcated user we will get the user profile as passed from middleware
type Env = {
    Variables: {
        user: UserType;
    }
}
// add Env to the middleware which will give access to "user" type variable
export const getUser = createMiddleware<Env>(async (c, next) => {
    try {
        const manager = sessionManager(c);
        const isAuthenticated = await kindeClient.isAuthenticated(manager);
        if (!isAuthenticated) {
            return c.json({ error: "Unauthorized" }, 401)
        }
        const user = await kindeClient.getUserProfile(manager);
        c.set("user", user);
        await next();
    } catch (error) {
        console.error(error);
        return c.json({ error: "Unauthorized" }, 401)
    }
})