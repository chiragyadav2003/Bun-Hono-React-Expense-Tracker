import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { Calendar } from '@/components/ui/calendar';
import { useQueryClient } from '@tanstack/react-query';
import { createExpense, getAllExpensesQueryOptions } from '@/lib/api';
import { createExpenseSchema } from '@server/sharedTypes.ts';

export const Route = createFileRoute('/_authenticated/create-expense')({
	component: CreateExpenses,
});

function CreateExpenses() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const form = useForm({
		validatorAdapter: zodValidator,
		defaultValues: {
			title: '',
			amount: '0',
			date: new Date().toISOString(),
		},
		onSubmit: async ({ value }) => {
			//get existing expenses before creating a new one
			const existingExpenses = await queryClient.ensureQueryData(
				getAllExpensesQueryOptions
			);

			// navigate to the expenses page after getting the existing expenses and before creating a new one as we will show loading while creating a new expense and show messages as per the response
			navigate({ to: '/expenses' });

			//loading state - we can send this data to any other page to show loading state
			queryClient.setQueryData(['loading-create-expense'], { expense: value })


			try {
				//success state

				// create a new expense
				const newExpense = await createExpense({ value });
				// set the new expense object in the cache so that it can be used in other components without refetching it using setQueryData
				queryClient.setQueryData(getAllExpensesQueryOptions.queryKey, {
					...existingExpenses,
					expenses: [newExpense, ...existingExpenses.expenses],
				});
			} catch (error) {
				//error state
			} finally {
				// remove the loading state
				queryClient.setQueryData(['loading-create-expense'], {})
			}




		},
	});

	return (
		<div className="p-2">
			<h2 className=" text-2xl font-semibold">Create-expense</h2>
			<form
				className=" max-w-md gap-y-4 m-auto flex flex-col "
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
			>
				<form.Field
					name="title"
					validators={{
						onChange: createExpenseSchema.shape.title,
					}}
					children={(field) => (
						<div>
							<Label htmlFor={field.name}>Title</Label>
							<Input
								type="text"
								id={field.name}
								placeholder="Title"
								name={field.name}
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
							/>
							{field.state.meta.errors ? (
								<em role="alert">{field.state.meta.errors.join(', ')}</em>
							) : null}
						</div>
					)}
				/>

				<form.Field
					name="amount"
					validators={{
						onChange: createExpenseSchema.shape.amount,
					}}
					children={(field) => (
						<div>
							<Label htmlFor={field.name}>Amount</Label>
							<Input
								type="number"
								id={field.name}
								placeholder="Amount"
								name={field.name}
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
							/>
							{field.state.meta.errors ? (
								<em role="alert">{field.state.meta.errors.join(', ')}</em>
							) : null}
						</div>
					)}
				/>

				<form.Field
					name="date"
					validators={{
						onChange: createExpenseSchema.shape.date,
					}}
					children={(field) => (
						<div className=" self-center">
							<Calendar
								mode="single"
								selected={new Date(field.state.value)}
								onSelect={(date) =>
									field.handleChange((date ?? new Date()).toISOString())
								}
								className="rounded-md border"
							/>
							{field.state.meta.errors ? (
								<em role="alert">{field.state.meta.errors.join(', ')}</em>
							) : null}
						</div>
					)}
				/>

				<form.Subscribe
					selector={(state) => [state.canSubmit, state.isSubmitting]}
					children={([canSubmit, isSubmitting]) => (
						<>
							<Button
								className=" w-full  self-center"
								type="submit"
								disabled={!canSubmit}
							>
								{isSubmitting ? 'Submit' : 'Submit'}
							</Button>
						</>
					)}
				/>
				{/* <Button type='submit'>Create</Button> */}
			</form>
		</div>
	);
}
