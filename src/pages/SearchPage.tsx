import { FC } from "react";
import { useLocation } from "react-router-dom";
import { TodoScreen } from "../TodoScreen";
import { ITodo } from "../types";

type LocationState = {
  todos: ITodo[];
  text: string;
};

export const SearchPage: FC = () => {
  const location = useLocation();
  const state = location.state as LocationState;
  const todos = state.todos;
  const text = state.text;

  return (
    <TodoScreen
      seacrhedTodos={todos.filter((todo) =>
        todo.content.toLowerCase().includes(text.toLowerCase())
      )}
      name="Searched"
    />
  );
};
