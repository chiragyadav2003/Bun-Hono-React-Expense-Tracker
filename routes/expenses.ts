import { Hono } from 'hono';
import { z } from "zod";


type Expenses = {
    id: number,
    title: string,
    amount: number
}

const createPostSchema = z.object({
    title: z.string().min(3).max(100),
    amount: z.number().int().positive()
})

const fakeExpenses: Expenses[] = [
    { id: 1, title: "Rent", amount: 1000 },
    { id: 2, title: "Food", amount: 200 },
    { id: 3, title: "Transport", amount: 100 }
]
const expensesRoute = new Hono();

expensesRoute.get("/", (c) => {
    return c.json(fakeExpenses);
})

expensesRoute.post("/", async (c) => {
    const data = await c.req.json();
    const expense = createPostSchema.parse(data);
    console.log(expense);
    return c.json(expense);
})



export default expensesRoute;