import { createFileRoute, Outlet } from "@tanstack/react-router";
// import { userQueryOptions } from "@/lib/api";


export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async () => {
    // userQueryOptions
    //check userqueryoptions for the user data
    // return { user: { name: "mkml" } }
    return { user: null }
  },
  component: Component
})

function Component() {
  // get user info from created route which will return the user object from beforeLoad 
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
      <button onClick={() => {
        <a></a>
      }}>Login</button>
    </div>
  )
}