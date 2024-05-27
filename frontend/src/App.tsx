import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api.ts";


async function getTotalSpent() {
  //make a get request with Hono RPC using client
  const res = await api.expenses['total-spent'].$get();
  if (!res.ok) {
    throw new Error("Server error");
  }
  const data = await res.json();
  return data;
}

function App() {

  const { isPending, data, error } = useQuery({
    queryKey: ['get-toal-spent'],
    queryFn: getTotalSpent,
  })

  if (error) return "An error has occured : " + error.message;

  return (
    <Card className=" w-full max-w-[350px] mx-auto">
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>The amount you've spent</CardDescription>
      </CardHeader>
      <CardContent>
        {isPending ? "....." : data.total}
      </CardContent>
    </Card >
  )
}

export default App

