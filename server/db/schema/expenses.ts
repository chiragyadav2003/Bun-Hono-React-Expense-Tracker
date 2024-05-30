import { text, numeric, pgTable, serial, index } from 'drizzle-orm/pg-core';



export const expenses = pgTable('expenses', {
    id: serial('id').primaryKey(),
    userId: text('user_id').notNull(),
    title: text('title').notNull(),
    amount: numeric('amount', { precision: 12, scale: 2 }).notNull(),
    //create index on the baseis of userId
}, (expenses) => {
    return {
        userIdIndex: index('name_idx').on(expenses.userId),
    }
});