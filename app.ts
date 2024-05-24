import { Hono } from 'hono';
import { logger } from "hono/logger";

import expensesRoute from './routes/expenses.ts';

const app = new Hono();
app.use('*', logger());

app.get("/", (c) => {
    return c.text("Hello World");
})

//adding route
app.route("/expenses", expensesRoute);



export default app;