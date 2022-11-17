import { doc, DocumentData, setDoc } from "firebase/firestore";
import { db } from "..";
import { ITodo } from "../types";


export const TodoService = {
  create: (todo: ITodo, dataSnap: Promise<DocumentData | undefined>, username: string) => {
    dataSnap.then(async (value) => {
      const todos: ITodo[] = value !== undefined ? value.todos : [];
      todos.push(todo);
      await setDoc(doc(db, "users", username != null ? username : "anon"), {
        email: username,
        todos: todos,
      });
    });
  },
  delete: (id: string, dataSnap: Promise<DocumentData | undefined>, username: string) => {
    dataSnap.then(async (value) => {
      const todos: ITodo[] = value !== undefined ? value.todos : [];
      const newTodos = todos.filter((todo) => todo.id !== id);
      await setDoc(doc(db, "users", username != null ? username : "anon"), {
        email: username,
        todos: newTodos,
      });
    });
  }
}