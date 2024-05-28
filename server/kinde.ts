import { createKindeServerClient, GrantType, type SessionManager } from "@kinde-oss/kinde-typescript-sdk";
import { type Context } from "hono";
import { getCookie, setCookie, deleteCookie } from "hono/cookie";

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