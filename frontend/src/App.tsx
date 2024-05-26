import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useEffect, useState } from "react";

function App() {

  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    async function getToalExpense() {
      const res = await fetch("/api/expenses/total-expenses");
      const data = await res.json();
      setTotalSpent(data.total)
    }
    getToalExpense()
  }, [totalSpent])

  return (
    <Card className=" w-full max-w-[350px] mx-auto">
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>The amount you've spent</CardDescription>
      </CardHeader>
      <CardContent>
        {totalSpent}
      </CardContent>
    </Card>
  )
}

export default App
