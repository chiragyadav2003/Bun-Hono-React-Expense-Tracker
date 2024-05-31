import { createFileRoute, Outlet } from "@tanstack/react-router";
import { userQueryOptions } from "@/lib/api";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute('/_authenticated')({
  //  context will pass down the queryClient to the beforeLoad function
  // NOTE - we use queryClient because we can not use useQuery hook in beforeLoad function as it is not a react component 
  beforeLoad: async ({ context }) => {
    const queryClient = context.queryClient;

    try {
      const data = await queryClient.fetchQuery(userQueryOptions)
      return data;
    } catch (error) {
      return { user: null };
    }
  },
  component: Component
})

function Component() {
  // get user info from created route context    
  const { user } = Route.useRouteContext();
  if (!user) {
    return <Login />
  }

  return <Outlet />

}

function Login() {
  return (
    <div>
      <h1>You have to login or register</h1>
      <div className="flex gap-x-10 items-start mt-6">
        <Button asChild>
          <a href="/api/login">Login</a>
        </Button>
        <Button asChild>
          <a href="/api/register">Register</a>
        </Button>
      </div>
    </div>
  )
}