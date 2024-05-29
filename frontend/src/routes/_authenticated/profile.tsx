import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { userQueryOptions } from "@/lib/api";

export const Route = createFileRoute('/_authenticated/profile')({
    component: Profile,
})



function Profile() {
    const { isPending, data, error } = useQuery(userQueryOptions)
    if (isPending) return "Loading...";
    if (error) return "not logged in";
    return (
        <div>
            <h1>Profile</h1>
            <p>
                Hello, {data.user.given_name} {data.user.family_name}
            </p>
            <a href="/api/logout">Logout</a>
        </div>
    )
}