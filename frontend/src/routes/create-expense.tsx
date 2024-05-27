import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export const Route = createFileRoute('/create-expense')({
  component: CreateExpenses,
})

function CreateExpenses() {
  return (
    <div className='p-2 flex flex-col items-center'>
      <h2 className=' text-2xl font-semibold unde'>Create-expense</h2 >
      <form className='grid w-full max-w-sm items-center gap-y-2 pt-4'>
        <Label htmlFor="title">Title</Label>
        <Input type="text" id="title" placeholder='Title' />
        <Label htmlFor="amount">Title</Label>
        <Input type="number" id="amount" placeholder='Amount' />
        <Button type='submit'>Create</Button>
      </form>
    </div>
  )
}