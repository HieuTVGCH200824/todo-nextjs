"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function TaskList() {
  const { toast } = useToast();

  const [editTodo, setEditTodo] = useState({
    id: 0,
    title: "",
    description: "",
    completed: false,
  });

  function handleEditSubmit(e: any) {
    e.preventDefault();
    const newTodo = {
      id: editTodo?.id,
      title: e.target.editTitle.value,
      description: e.target.editDescription.value,
      completed: editTodo?.completed,
    };

    updateMutation.mutate(newTodo);
  }

  const queryClient = useQueryClient();

  function getTodos() {
    return fetch("http://localhost:3000/api/todo", {
      method: "GET",
    }).then((res) => res.json());
  }

  function updateTodo(todo: any) {
    return fetch("http://localhost:3000/api/todo", {
      method: "PUT",
      body: JSON.stringify(todo),
    }).then((res) => res.json());
  }

  function deleteTodo(id: number) {
    return fetch("http://localhost:3000/api/todo", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    }).then((res) => res.json());
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const updateMutation = useMutation({
    mutationFn: (newTodo: any) => {
      return updateTodo(newTodo);
    },
    onSuccess: (newTodo) => {
      queryClient.invalidateQueries(["todos"]); // Invalidate the entire todos list
      toast({
        description: "Task updated! 🎉",
      });
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
            className="grid grid-cols-6 gap-4 justify-center items-center "
          >
            <Checkbox
              checked={todo.completed}
              onCheckedChange={() => {
                todo.completed = !todo.completed;
                updateMutation.mutate(todo);
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
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  onClick={() => {
                    setEditTodo(todo);
                  }}
                  variant="ghost"
                  className="col-span-1 group justify-self-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 text-amber-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit task</DialogTitle>
                  <DialogDescription>
                    Enter new title and description of the task
                  </DialogDescription>
                </DialogHeader>
                <form action="POST" onSubmit={handleEditSubmit}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="editTitle" className="text-right">
                        Title
                      </Label>
                      <Input
                        id="editTitle"
                        defaultValue={editTodo?.title}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="editDescription" className="text-right">
                        Description
                      </Label>
                      <Input
                        id="editDescription"
                        defaultValue={editTodo?.description}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogTrigger asChild>
                      <Button type="submit">Save changes</Button>
                    </DialogTrigger>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </li>
        ))}
      </ul>
    </div>
  );
}
