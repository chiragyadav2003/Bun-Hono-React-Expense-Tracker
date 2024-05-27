import { hc } from 'hono/client';
import { type ApiRoutes } from "@server/app.ts";

const client = hc<ApiRoutes>('/'); // we add "/" because we have modified it in vite proxy so they are on the same origin


export const api = client.api;