"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useTodoStore from "@/lib/dummyData";
export default function TodoForm() {
  const queryClient = useQueryClient();
  const todos = useTodoStore;
  // const addTodo = useTodoStore((state: any) => state.addTodo);
  function createTodos(newTodo: any) {
    // return fetch("https://jsonplaceholder.typicode.com/todos", {
    //   method: "POST",
    //   body: JSON.stringify(newTodo),
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8",
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((res) => console.log(res));
    return Promise.resolve(newTodo);
  }

  const mutation = useMutation({
    mutationFn: (newTodo: any) => {
      return createTodos(newTodo);
    },
    onSuccess: (newTodo) => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  function handleSubmit(e: any) {
    e.preventDefault();
    const newTodo = {
      title: e.target.title.value,
      description: e.target.description.value,
      completed: false,
    };
    mutation.mutate(newTodo);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add new task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new task</DialogTitle>
          <DialogDescription>
            Enter title and description of the task
          </DialogDescription>
        </DialogHeader>
        <form action="POST" onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input id="title" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Description
              </Label>
              <Input id="description" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
