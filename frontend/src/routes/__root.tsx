import {
	createRootRouteWithContext,
	Link,
	Outlet,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { type QueryClient } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/sonner"

interface MyRouterContext {
	queryClient: QueryClient; //specifying the context type which will be passed to the router context
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	component: Root,
});

function NavBar() {
	return (
		<div className="flex justify-between p-2 max-w-2xl m-auto items-baseline">
			<Link
				to="/"
				className=" text-3xl font-bold bg-gradient-to-br from-red-200 to-orange-400 p-1 rounded-lg text-transparent bg-clip-text"
			>
				ExpenseTracker
			</Link>
			<div className=" flex gap-x-4 m-auto">
				<Link to="/about" className="[&.active]:font-bold">
					About
				</Link>
				<Link to="/expenses" className="[&.active]:font-bold">
					Expenses
				</Link>
				<Link to="/create-expense" className="[&.active]:font-bold">
					Create
				</Link>
				<Link to="/profile" className="[&.active]:font-bold">
					Profile
				</Link>
			</div>
		</div>
	);
}

function Root() {
	return (
		<>
			<NavBar />
			<hr />
			<div className="p-2 max-w-2xl m-auto">
				<Outlet />
			</div>
			<Toaster />
			<TanStackRouterDevtools />
		</>
	);
}
