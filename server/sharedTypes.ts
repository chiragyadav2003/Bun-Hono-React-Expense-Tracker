import { z } from "zod";

export const ExpenseSchema = z.object({
    id: z.number().int().positive().min(1),
    title: z.string().min(3, { message: "Title must be at least 3 characters " }).max(100),
    amount: z.string().regex(/^(?!0(\.0{1,2})?$)\d+(\.\d{1,2})?$/, { message: "Amount must be a number and greater than 0" }),
})

//in createPostSchema we do not require id so omit/remove it
export const createExpenseSchema = ExpenseSchema.omit({ id: true })