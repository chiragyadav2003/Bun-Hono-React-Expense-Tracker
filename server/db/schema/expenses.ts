import { text, timestamp, numeric, pgTable, serial, index, date } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';



export const expenses = pgTable('expenses', {
    id: serial('id').primaryKey(),
    userId: text('user_id').notNull(),
    title: text('title').notNull(),
    amount: numeric('amount', { precision: 12, scale: 2 }).notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    date: date('date').notNull(),
    //create index on the baseis of userId
}, (expenses) => {
    return {
        userIdIndex: index('name_idx').on(expenses.userId),
    }
});


// Schema for inserting a user - can be used to validate API requests
export const insertExpenseSchema = createInsertSchema(expenses, {
    title: z.string().min(3, { message: "Title must be at least 3 characters" }).max(100),
    amount: z.string().regex(/^(?!0(\.0{1,2})?$)\d+(\.\d{1,2})?$/, { message: "Amount must be a valid monetary value" })
});


// Schema for selecting a user - can be used to validate API responses
export const selectExpenseSchema = createSelectSchema(expenses);