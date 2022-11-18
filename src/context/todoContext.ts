import { createContext } from "react";
import {ITodo} from "../types"

export const TodoContext = createContext({
  todosContext: <ITodo[]>[],
  setTodosContext: (value: ITodo[]) => {},
});