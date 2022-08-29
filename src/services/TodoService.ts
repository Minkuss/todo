import { ITodo } from "../types";

export const TodoService = {
  create: (todo: ITodo) => {
    const todos: ITodo[] = JSON.parse(localStorage.getItem("todos") || "[]");
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos))
  },
  delete: (id: string) => {
    const todos: ITodo[] = JSON.parse(localStorage.getItem("todos") || "[]");
    const newTodos = todos.filter(todo => todo.id !== id);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  },
}