import { insertExpenseSchema } from './db/schema/expenses.ts';

export const createExpenseSchema = insertExpenseSchema.omit({
	id: true,
	userId: true,
	createdAt: true,
});
