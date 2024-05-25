import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
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

//here zValidator will validate incoming request 'json' data as per createPostSchema validation
expensesRoute.post("/", zValidator('json', createPostSchema), async (c) => {
    const expense = await c.req.valid('json');
    fakeExpenses.push({ ...expense, id: fakeExpenses.length + 1 })
    return c.json(expense, 201)
})



export default expensesRoute;