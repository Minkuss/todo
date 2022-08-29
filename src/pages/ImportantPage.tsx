import { nanoid } from "nanoid";
import { FC, useCallback, useEffect, useState } from "react";
import { TodoService } from "../services/TodoService";
import { TodoScreen } from "../TodoScreen";
import { ITodo } from "../types";

export const ImportantScreen: FC = () => {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    console.log("render");
    const todayData = localStorage.getItem("todos") || "[]";
    const data2: ITodo[] = JSON.parse(todayData);
    const signedTodos = data2.filter((todo) => todo.important === true);
    setTodos(signedTodos);
  }, []);

  const getValue = useCallback((text: string) => {
    setTodoText(text);
  }, []);

  const addTodo = useCallback(() => {
    if (todoText !== "") {
      const obj = {
        content: todoText,
        type: "important",
        id: nanoid(),
        important: true,
      };

      const newTodo: ITodo[] = [...todos, obj];

      setTodos(newTodo);
      setTodoText("");

      TodoService.create(obj);
    }
  }, [todoText, todos]);

  const delTodo = useCallback(
    (id: string) => {
      const deletedTodo = todos.filter((todo) => todo.id !== id);

      setTodos(deletedTodo);

      TodoService.delete(id);
    },
    [todos]
  );

  return (
    <TodoScreen
      onClick={(id) => delTodo(id)}
      todos={todos}
      onKeyUp={(key) => (key.key === "Enter" ? addTodo() : null)}
      todoText={todoText}
      onChange={(text) => getValue(text)}
      name="Important"
    />
  );
};
