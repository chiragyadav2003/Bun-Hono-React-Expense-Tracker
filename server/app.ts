import { Hono } from 'hono';
import { logger } from "hono/logger";
import { serveStatic } from 'hono/bun';

import expensesRoute from './routes/expenses.ts';

// const app = new Hono().basePath('/api');
const app = new Hono();
app.use('*', logger());

//routing expense requests to expense route
app.route("/api/expenses", expensesRoute);


//--------serving static files--------
// if the requested api route that does not exist on the server, we will serve simple react app
app.get('*', serveStatic({ root: './frontend/dist' }))
app.get('*', serveStatic({ path: './frontend/dist/index.html' }))



export default app;