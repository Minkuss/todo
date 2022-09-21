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

  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState<ITodo[]>([]);

  const element = apidata.find((el) => el.users === state.username);

  const getData = async () => {
    await axios.get(apiUrl).then((resp) => {
      const data: IApiData[] = resp.data;
      const element = data.find((el) => el.users === state.username);
      setTodos(
        element
          ? element.todos.filter(
              (todo) => todo.type === "today" || todo.type === "important"
            )
          : []
      );
      setapiData(data);
    });
  };

  useEffect(() => {
    const data: ITodo[] = JSON.parse(localStorage.getItem("todos") || "[]");
    const todos = data.filter(
      (todo) => todo.type === "today" || todo.type === "important"
    );
    setTodos(todos);

    // getData();
  }, []);

  const getValue = (text: string) => {
    setTodoText(text);
  };

  const addTodo = useCallback(() => {
    if (todoText !== "") {
      const obj = {
        content: todoText,
        type: "today",
        id: nanoid(),
        important: false,
      };

      const newTodo: ITodo[] = [...todos, obj];

      setTodos(newTodo);
      setTodoText("");

      TodoService.create(obj);

      if (element) {
        element.todos.push(obj);
        axios
          .put(`https://retoolapi.dev/xpODyJ/data/${element.id}`, {
            users: element.users,
            password: element.password,
            todos: element.todos,
          })
          .then((res) => {
            console.log(res);
            console.log(res.data);
          });
      }
    }
  }, [element, todoText, todos]);

  const delTodo = (id: string) => {
    const deletedTodo = todos.filter((todo) => todo.id !== id);

    setTodos(deletedTodo);

    TodoService.delete(id);
  };

  return (
    <TodoScreen
      onClick={(id) => delTodo(id)}
      todos={todos}
      onKeyUp={(key) => (key.key === "Enter" ? addTodo() : null)}
      todoText={todoText}
      onChange={(text) => getValue(text)}
      name="Today"
    />
  );
};
