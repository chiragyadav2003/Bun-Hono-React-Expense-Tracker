import { createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { type QueryClient } from '@tanstack/react-query';

interface MyRouterContext {
    queryClient: QueryClient //specifying the context type which will be passed to the router context 
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
    component: Root,
})

function NavBar() {
    return (
        <div className="p-2 flex gap-2">
            <Link to="/about" className="[&.active]:font-bold">
                About
            </Link>
            <Link to="/" className="[&.active]:font-bold">
                Home
            </Link>{' '}
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
    )
}

function Root() {
    return (
        <>
            <NavBar />
            <hr />
            <Outlet />
            <TanStackRouterDevtools />
        </>
    )
}