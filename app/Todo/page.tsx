"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import TaskList from "@/components/custom/TaskList";
import QueryClientWrapper from "@/components/custom/QueryClientWrapper";
import TodoForm from "@/components/custom/TodoForm";
import { verifyToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import useStore from "@/lib/store";
import { useEffect } from "react";

export default function Index() {


  return (
    <QueryClientWrapper>
      <div className="bg-[#020817] w-full h-screen flex justify-center items-center">
        <Card className="w-[450px]">
          <CardHeader>
            <CardTitle>Todo List</CardTitle>
            <CardDescription>
              A list of tasks that need to be completed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TaskList />
          </CardContent>
          <CardFooter className="flex justify-between">
            <TodoForm></TodoForm>
          </CardFooter>
        </Card>
      </div>
    </QueryClientWrapper>
  );
}
