import { hc } from 'hono/client';
import { type ApiRoutes } from '@server/app.ts';
import { queryOptions } from '@tanstack/react-query';
import { type CreateExpense } from '@server/sharedTypes.ts';

const client = hc<ApiRoutes>('/'); // we add "/" because we have modified it in vite proxy so they are on the same origin

export const api = client.api;

export const userQueryOptions = queryOptions({
	queryKey: ['get-current-user'],
	queryFn: getCurrentUser,
	staleTime: Infinity, // we don't want to refetch this data unless the user logs out and logs in again
});

async function getCurrentUser() {
	const res = await api.me.$get();
	if (!res.ok) {
		throw new Error('Server error');
	}
	const data = await res.json();
	return data;
}

async function getAllExpenses() {
	const res = await api.expenses.$get();
	if (!res.ok) {
		throw new Error('Server error');
	}
	const data = await res.json();
	return data;
}

export const getAllExpensesQueryOptions = queryOptions({
	queryKey: ['get-all-expenses'],
	queryFn: getAllExpenses,
	staleTime: 1000 * 60 * 5, // 5 minutes
});

export async function createExpense({ value }: { value: CreateExpense }) {
	// create a new expense
	const res = await api.expenses.$post({ json: value });
	if (!res.ok) {
		throw new Error('Server error');
	}

	// newly created expense object
	const newExpense = await res.json();
	return newExpense;
}

export const loadingCreateExpenseQueryOptions = queryOptions<{ expense?: CreateExpense }>({
	queryKey: ['loading-create-expense'],
	queryFn: async () => {
		return {};
	},
	staleTime: Infinity,
});

export async function deleteExpense({ id }: { id: number }) {
	await new Promise((resolve) => setTimeout(resolve, 4000)); // simulate a slow network request
	const res = await api
		.expenses[':id{[0-9]+}']
		.$delete({ param: { id: String(id) } });

	if (!res.ok) {
		throw new Error('Server error');
	}

	return true;
}