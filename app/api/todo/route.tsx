import { NextRequest, NextResponse } from "next/server";

const todo = [
  {
    id: 1,
    title: "todo 1",
    description: "todo 1 description",
    completed: false,
  },
  {
    id: 2,
    title: "todo 2",
    description: "todo 2 description",
    completed: false,
  },
  {
    id: 3,
    title: "todo 3",
    description: "todo 3 description",
    completed: false,
  },
];

export async function GET() {
  return NextResponse.json(todo);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const newTodo = {
    id: todo.length + 1,
    title: body.title,
    description: body.description,
    completed: false,
  };
  todo.push(newTodo);
  return NextResponse.json(newTodo);
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  //update todo item with same id as body.id
  todo.map((t) => {
    if (t.id === body.id) {
      t.title = body.title;
      t.description = body.description;
      t.completed = body.completed;
    }
  });
  return NextResponse.json(todo);
}

export async function DELETE(request: NextRequest) {
  const body = await request.json();
  //delete todo
  const res = todo.splice(
    todo.findIndex((t) => t.id === body.id),
    1
  );

  return NextResponse.json(todo);
}
