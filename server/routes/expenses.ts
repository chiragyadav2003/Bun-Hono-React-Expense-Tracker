import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from "zod";
import { getUser } from "../kinde.ts";

const ExpenseSchema = z.object({
    id: z.number().int().positive().min(1),
    title: z.string().min(3).max(100),
    amount: z.number().int().positive()
})

type Expenses = z.infer<typeof ExpenseSchema>

//in createPostSchema we do not require id so omit it
const createPostSchema = ExpenseSchema.omit({ id: true })

const fakeExpenses: Expenses[] = [
    { id: 1, title: "Rent", amount: 1000 },
    { id: 2, title: "Food", amount: 200 },
    { id: 3, title: "Transport", amount: 100 }
]


const expensesRoute = new Hono()
    .get("/", getUser, (c) => {
        return c.json({ expenses: fakeExpenses });
    })
    //here zValidator will validate incoming request 'json' data as per createPostSchema validation
    .post("/", getUser, zValidator('json', createPostSchema), async (c) => {
        const expense = await c.req.valid('json');
        fakeExpenses.push({ ...expense, id: fakeExpenses.length + 1 })
        return c.json({ msg: "Expense ceated successfully", expense }, 201)
    })
    // regex {[0-9]+} ensures that id entered is integer
    .get("/:id{[0-9]+}", getUser, async (c) => {
        //id is of type string so we need to change it to number
        const id = Number.parseInt(c.req.param('id'));
        const expense = fakeExpenses.find(expense => expense.id === id);
        if (!expense) {
            return c.notFound()
        }
        return c.json({ expense }, 201)
    })
    //total expense
    .get('total-spent', getUser, (c) => {
        const total = fakeExpenses.reduce((acc, expense) => acc + expense.amount, 0)
        return c.json({ total })
    })
    .delete("/:id{[0-9]+}", getUser, async (c) => {
        //id is of type string so we need to change it to number
        const id = Number.parseInt(c.req.param('id'));
        const expenseIndex = fakeExpenses.findIndex(expense => expense.id === id);
        if (expenseIndex == -1) {
            return c.notFound()
        }

        //1st parameter in index , 2nd parameter means remove one item only
        const deleteExpense = fakeExpenses.splice(expenseIndex, 1)

        return c.json({ msg: "expense deleted successfully", deleteExpense }, 202)
    })



export { expensesRoute };