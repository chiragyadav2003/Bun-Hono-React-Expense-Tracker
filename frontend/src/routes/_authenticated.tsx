import { createFileRoute, Outlet } from "@tanstack/react-router";
import { userQueryOptions } from "@/lib/api";

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
  console.log("@@user ", user)
  if (!user) {
    return <Login />
  }

  return <Outlet />

}

function Login() {
  return (
    <div>
      <h1>You have to login</h1>
      <a href="/api/login">Login</a>
    </div>
  )
}