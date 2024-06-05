import { getAllExpensesQueryOptions, loadingCreateExpenseQueryOptions, deleteExpense } from '@/lib/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { toast } from 'sonner';

export const Route = createFileRoute('/_authenticated/expenses')({
	component: Expenses,
});

function Expenses() {
	const { isPending, data, error } = useQuery(getAllExpensesQueryOptions);

	//handle loading state for create expense using the query key ['get-all-expenses'] which we've created in create-expense.tsx
	const { data: loadingCreateExpense } = useQuery(loadingCreateExpenseQueryOptions)

	if (error) return 'An error has occured : ' + error.message;

	return (
		<div className="p-2 max-w-3xl m-auto">
			<Table>
				<TableCaption>A list of all your recent expenses.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">Id</TableHead>
						<TableHead>Title</TableHead>
						<TableHead>Amount</TableHead>
						<TableHead>Date</TableHead>
						<TableHead>Delete</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{
						loadingCreateExpense?.expense && (
							<TableRow>
								<TableCell className="font-medium">
									<Skeleton className="h-4" />
								</TableCell>
								<TableCell><Skeleton className="h-4" /></TableCell>
								<TableCell><Skeleton className="h-4" /></TableCell>
								<TableCell><Skeleton className="h-4" /></TableCell>
							</TableRow>
						)
					}
					{isPending
						? Array(3)
							.fill(0)
							.map((_, i) => (
								<TableRow key={i}>
									<TableCell className="font-medium">
										<Skeleton className="h-4" />
									</TableCell>
									<TableCell>
										<Skeleton className="h-4" />
									</TableCell>
									<TableCell>
										<Skeleton className="h-4" />
									</TableCell>
									<TableCell>
										<Skeleton className="h-4" />
									</TableCell>
									<TableCell>
										<Skeleton className="h-4" />
									</TableCell>
								</TableRow>
							))
						: data?.expenses.map((expense) => (
							<TableRow key={expense.id}>
								<TableCell className="font-medium">{expense.id}</TableCell>
								<TableCell>{expense.title}</TableCell>
								<TableCell>{expense.amount}</TableCell>
								<TableCell>{expense.date}</TableCell>
								<TableCell>
									<ExpenseDeleteButton id={expense.id} />
								</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
		</div>
	);
}

function ExpenseDeleteButton({ id }: { id: number }) {
	const queryClient = useQueryClient()
	const mutation = useMutation({
		mutationFn: deleteExpense,
		onError: () => {
			toast.error("Error", {
				description: "Failed to delete expense"
			})
		},
		onSuccess: () => {
			toast.success("Success", {
				description: "Expense deleted successfully"
			})
			//refetch the expense
			queryClient.setQueryData(
				getAllExpensesQueryOptions.queryKey,
				(existingExpenses) => ({
					...existingExpenses,
					expenses: existingExpenses!.expenses.filter((expense) => expense.id !== id)
				})
			);
		}
	})

	return (
		<Button
			disabled={mutation.isPending}
			onClick={() => mutation.mutate({ id })}
			variant={'outline'}
			size={'icon'}
		>
			{
				mutation.isPending ? "..." : <Trash className='h-4 w-4' />
			}
		</Button>
	)
}