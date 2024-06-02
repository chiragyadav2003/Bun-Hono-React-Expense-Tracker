import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { createExpenseSchema } from '../sharedTypes.ts';
import { getUser } from '../kinde.ts';

import {
	expenses as expensesTable,
	insertExpenseSchema,
} from '../db/schema/expenses.ts';
import { db } from '../db/index.ts';
import { eq, desc, sum, and } from 'drizzle-orm';

const expensesRoute = new Hono()
	// get all expenses information
	.get('/', getUser, async (c) => {
		const user = c.var.user;
		const expenses = await db
			.select()
			.from(expensesTable)
			.where(eq(expensesTable.userId, user.id))
			.orderBy(desc(expensesTable.createdAt))
			.limit(100); //added pagination
		return c.json({ expenses: expenses });
	})
	//here zValidator will validate incoming request 'json' data as per createPostSchema validation
	.post('/', getUser, zValidator('json', createExpenseSchema), async (c) => {
		const expense = await c.req.valid('json');
		const user = c.var.user;

		const validatedExpense = insertExpenseSchema.parse({
			...expense,
			userId: user.id,
		});

		//insert the expense into the database and return the inserted expense
		const res = await db
			.insert(expensesTable)
			.values(validatedExpense)
			.returning()
			.then((res) => res[0]);

		return c.json(res, 201);
	})
	// regex {[0-9]+} ensures that id entered is integer
	.get('/:id{[0-9]+}', getUser, async (c) => {
		//id is of type string so we need to change it to number
		const id = Number.parseInt(c.req.param('id'));
		const user = c.var.user;
		const expense = await db
			.select()
			.from(expensesTable)
			.where(and(eq(expensesTable.userId, user.id), eq(expensesTable.id, id)))
			.orderBy(desc(expensesTable.createdAt))
			.then((res) => res[0]);

		if (!expense) {
			return c.notFound();
		}

		return c.json({ expense }, 201);
	})
	//total expense
	.get('total-spent', getUser, async (c) => {
		const user = c.var.user;
		const result = await db
			.select({ total: sum(expensesTable.amount) })
			.from(expensesTable)
			.where(eq(expensesTable.userId, user.id))
			.limit(1)
			.then((res) => res[0]);
		return c.json(result);
	})
	.delete('/:id{[0-9]+}', getUser, async (c) => {
		//id is of type string so we need to change it to number
		const id = Number.parseInt(c.req.param('id'));
		const user = c.var.user;

		const expense = await db
			.delete(expensesTable)
			.where(and(eq(expensesTable.userId, user.id), eq(expensesTable.id, id)))
			.returning()
			.then((res) => res[0]);

		if (!expense) {
			return c.notFound();
		}

		return c.json(
			{ msg: 'expense deleted successfully', deletedExpense: expense },
			202
		);
	});

export { expensesRoute };
