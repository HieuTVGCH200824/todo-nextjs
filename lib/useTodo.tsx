//custom hook for todo crud
import { useState, useEffect } from "react";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { Todo } from "@/lib/type";

export default function useTodo() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["todos"],
    queryFn: () => {
      return fetch("http://localhost:3000/api/todo", {
        method: "GET",
      }).then((res) => res.json());
    },
  });

  const addTodo = (todo: Todo) => {
    return fetch("/api/todo", {
      method: "POST",
      body: JSON.stringify(todo),
    })
      .then((res) => res.json())
      .then(refetch);
  };

  const updateTodo = (todo: Todo) => {
    return fetch("http://localhost:3000/api/todo", {
      method: "PUT",
      body: JSON.stringify(todo),
    })
      .then((res) => res.json())
      .then(refetch);
  };
  const deleteTodo = (id: number) => {
    return fetch("http://localhost:3000/api/todo", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then(refetch);
  };

  return {
    data,
    isLoading,
    isError,
    addTodo,
    updateTodo,
    deleteTodo,
  };
}
