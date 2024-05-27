import { Hono } from 'hono';
import { logger } from "hono/logger";
import expensesRoute from './routes/expenses.ts';

const app = new Hono();
app.use('*', logger());

//------------Hono RPC------------
//routing expense requests to expense route
const apiRoutes = app.basePath("/api").route("/expenses", expensesRoute);

//exporting api routes type
export type ApiRoutes = typeof apiRoutes;


//--------serving static files--------

// import { serveStatic } from 'hono/bun';


// if the requested api route that does not exist on the server, we will serve simple react app
// app.get('*', serveStatic({ root: './frontend/dist' }))
// app.get('*', serveStatic({ path: './frontend/dist/index.html' }))


export default app;