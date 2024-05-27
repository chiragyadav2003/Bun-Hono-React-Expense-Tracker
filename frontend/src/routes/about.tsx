import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/about')({
    component: About,
})

function About() {
    return (
        <div className="p-2">
            <h2>About page</h2>
        </div>
    )
}