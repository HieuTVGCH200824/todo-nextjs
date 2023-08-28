"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation"; // Import the useRouter hook

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useStore, token } from "@/lib/store";
import { FormEventHandler } from "react";

export default function Home() {
  const [setToken] = useStore((state: token) => {
    return [state.setToken];
  });

  const router = useRouter(); // Initialize the router

  const handleLogin: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const username = form.username.value;
    const password = form.password.value;

    const response = await fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((res) => {
        setToken(res.token);
        router.push("/Todo");
      });
    return response;
  };

  return (
    <div className="bg-[#020817] w-full h-screen flex justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <form action="POST" onSubmit={handleLogin}>
          <CardContent>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input id="username" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  password
                </Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="on"
                  className="col-span-3"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-row-reverse">
            <Button>Login</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
