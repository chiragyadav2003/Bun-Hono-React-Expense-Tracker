import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useEffect, useState } from "react";

import { api } from "@/lib/api.ts";

function App() {
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    async function getTotalSpent() {
      //make a get request with Hono RPC using client
      const res = await api.expenses['total-spent'].$get();
      const data = await res.json();
      setTotalSpent(data.total)
    }
    getTotalSpent()
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
