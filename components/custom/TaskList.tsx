"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import useTodoStore from "@/lib/dummyData";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

export default function TaskList() {
  const { toast } = useToast();

  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  // const [todos, setTodos] = useTodoStore((state: any) => [
  //   state.todos,
  //   state.setTodos,
  // ]);
  const [todos, setTodos] = useState(useTodoStore);
  //watch todos
  useEffect(() => {
    console.log("todos", todos);
  }, [todos]);

  function getTodos() {
    return Promise.resolve(todos);
  }

  function updateTodo(todo: any) {
    todo.completed = !todo.completed;
    const newTodos = todos.map((t: any) => (t.id === todo.id ? todo : t));
    setTodos(newTodos);
    return Promise.resolve(todo);
  }

  function deleteTodo(id: number) {
    const newTodos = todos.filter((todo: any) => todo.id !== id);
    setTodos(newTodos);
    return Promise.resolve({});
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const updateMutation = useMutation({
    mutationFn: (newTodo) => {
      return updateTodo(newTodo);
    },
    onSuccess: (newTodo) => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (todo: any) => {
      return deleteTodo(todo.id);
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries(["todos"]); // Invalidate the entire todos list
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error fetching data</p>;
  }

  return (
    <div>
      <ul className="flex flex-col gap-4">
        {data?.map((todo: any) => (
          <li
            key={todo.id}
            className="grid grid-cols-5 gap-4 justify-center items-center "
          >
            <Checkbox
              checked={todo.completed}
              onCheckedChange={(checked) => {
                updateMutation.mutate(todo);
                toast({
                  description: "Congrats! You completed a task! 🎉",
                });
              }}
            />
            <div className="col-span-3 cursor-help">
              <HoverCard>
                <HoverCardTrigger>{todo.title}</HoverCardTrigger>
                <HoverCardContent>{todo.description}</HoverCardContent>
              </HoverCard>
            </div>
            <Button
              variant="ghost"
              className="col-span-1 group justify-self-center"
              onClick={() => {
                toast({
                  description: "Task deleted! 😢",
                });
                deleteMutation.mutate(todo);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-rose-400 group-hover:text-rose-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
