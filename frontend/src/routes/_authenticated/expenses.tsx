import { getAllExpensesQueryOptions } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
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

export const Route = createFileRoute('/_authenticated/expenses')({
	component: Expenses,
});

function Expenses() {
	const { isPending, data, error } = useQuery(getAllExpensesQueryOptions);

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
					</TableRow>
				</TableHeader>
				<TableBody>
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
									</TableRow>
								))
						: data?.expenses.map((expense) => (
								<TableRow key={expense.id}>
									<TableCell className="font-medium">{expense.id}</TableCell>
									<TableCell>{expense.title}</TableCell>
									<TableCell>{expense.amount}</TableCell>
									<TableCell>{expense.date}</TableCell>
								</TableRow>
							))}
				</TableBody>
			</Table>
		</div>
	);
}
