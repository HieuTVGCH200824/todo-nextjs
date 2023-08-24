// import { create } from "zustand";

// const useTodoStore = create((set) => ({
//   todos: [
//     {
//       id: 1,
//       title: "delectus aut autem",
//       description: "This is the first task",
//       completed: false,
//     },
//     {
//       id: 2,
//       title: "quis ut nam facilis et officia qui",
//       description: "This is the second task",
//       completed: false,
//     },
//     {
//       id: 3,
//       title: "fugiat veniam minus",
//       description: "This is the third task",
//       completed: false,
//     },
//     {
//       id: 4,
//       title: "et porro tempora",
//       description: "This is the fourth task",
//       completed: true,
//     },
//     {
//       id: 5,
//       title: "laboriosam mollitia et enim quasi adipisci quia provident illum",
//       description: "This is the fifth task",
//       completed: false,
//     },
//   ],
//   setTodos: (todos: any) => set({ todos }),
// }));

const useTodoStore = [
  {
    id: 1,
    title: "delectus aut autem",
    description: "This is the first task",
    completed: false,
  },
  {
    id: 2,
    title: "quis ut nam facilis et officia qui",
    description: "This is the second task",
    completed: false,
  },
];

export default useTodoStore;
