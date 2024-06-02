import { hc } from 'hono/client';
import { type ApiRoutes } from '@server/app.ts';
import { queryOptions } from '@tanstack/react-query';

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
