import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/create-expense')({
  component: CreateExpenses,
})

function CreateExpenses() {
  return (
    <div>Hello /create-expense!</div>
  )
}