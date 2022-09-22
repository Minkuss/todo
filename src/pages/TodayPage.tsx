import axios from "axios";
import { nanoid } from "nanoid";
import { FC, useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { TodoService } from "../services/TodoService";
import { TodoScreen } from "../TodoScreen";
import { IApiData, ITodo } from "../types";
import { apiUrl } from "../urls";

type LocationState = {
  username: string;
  todos: ITodo[];
};

export const TodayScreen: FC = () => {
  const location = useLocation();
  const state = location.state as LocationState;
  const [apidata, setapiData] = useState<IApiData[]>([]);

  // const element = apidata.find((el) => el.users === state.username);

  // const getData = async () => {
  //   await axios.get(apiUrl).then((resp) => {
  //     const data: IApiData[] = resp.data;
  //     const element = data.find((el) => el.users === state.username);
  //     setTodos(
  //       element
  //         ? element.todos.filter(
  //             (todo) => todo.type === "today" || todo.type === "important"
  //           )
  //         : []
  //     );
  //     setapiData(data);
  //   });
  // };

  // useEffect(() => {
  //   const data: ITodo[] = JSON.parse(localStorage.getItem("todos") || "[]");
  //   const todos = data.filter(
  //     (todo) => todo.type === "today" || todo.type === "important"
  //   );
  //   setTodos(todos);

  //   // getData();
  // }, []);

  return <TodoScreen name="Today" />;
};
