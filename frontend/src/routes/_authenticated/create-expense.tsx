import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useForm } from '@tanstack/react-form';

import { api } from '@/lib/api';


export const Route = createFileRoute('/_authenticated/create-expense')({
  component: CreateExpenses,
})

function CreateExpenses() {
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      title: '',
      amount: 0
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      await new Promise(r => setTimeout(r, 3000))

      const res = await api.expenses.$post({ json: value })
      if (!res.ok) {
        throw new Error("Server error")
      }
      navigate({ to: "/expenses" })
      console.log(value)
    },
  })


  return (
    <div className='p-2'>
      <h2 className=' text-2xl font-semibold'>Create-expense</h2 >
      <form
        className=' max-w-md m-auto '
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="title"
          children={(field) => (
            <>
              <Label htmlFor={field.name}>Title</Label>
              <Input type="text" id={field.name} placeholder='Title'
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </>
          )}
        />
        <form.Field
          name="amount"
          children={(field) => (
            <>
              <Label htmlFor={field.name}>Amount</Label>
              <Input type="number" id={field.name} placeholder='Amount'
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(Number(e.target.value))}
              />
            </>
          )}
        />
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <>
              <Button className='mt-4' type="submit" disabled={!canSubmit} >
                {isSubmitting ? 'Submit' : 'Submit'}
              </Button>
            </>
          )}
        />
        {/* <Button type='submit'>Create</Button> */}
      </form>
    </div>
  )
}