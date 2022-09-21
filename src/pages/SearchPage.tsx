import { FC } from "react";
import { useLocation } from "react-router-dom";
import { SearchedElementBlock } from "../components/SearchedElementBlock";
import { TodoScreen } from "../TodoScreen";
import { ITodo } from "../types";

type LocationState = {
  todos: ITodo[];
};

export const SearchPage: FC = () => {
  const location = useLocation();
  const state = location.state as LocationState;

  return <TodoScreen todos={state.todos} name="Searched" />;
};
