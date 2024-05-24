import { Hono } from 'hono';

const expensesRoute = new Hono();

type Expenses = {
    id: number,
    title: string,
    amount: number
}

const fakeExpenses: Expenses[] = [
    {
        id: 1,
        title: "Rent",
        amount: 1000
    },
    {
        id: 2,
        title: "Food",
        amount: 200
    },
    {
        id: 3,
        title: "Transport",
        amount: 100
    }
]

expensesRoute.get("/", (c) => {
    return c.json(fakeExpenses);
})

expensesRoute.post("/", async (c) => {
    const expense = await c.req.json();
    console.log(expense);
    return c.json(expense);
})



export default expensesRoute;