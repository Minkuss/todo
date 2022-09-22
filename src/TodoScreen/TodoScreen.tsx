import { Button, Drawer } from "@blueprintjs/core";
import classNames from "classnames";
import { percent } from "csx";
import { nanoid } from "nanoid";
import React, { FC, useCallback, useEffect, useState } from "react";
import { TodoBlock } from "../components/TodoBlock/TodoBlock";
import { TodoService } from "../services/TodoService";
import { ITodo } from "../types";
import * as classes from "./TodoScreen.styles";

interface ITodoScreenProps {
  name: string;
  seacrhedTodos?: ITodo[];
  onKeyUp?: (value: React.KeyboardEvent) => unknown;
  onChange?: (value: string) => unknown;
  todoText?: string;
  onClick?: (value: string) => unknown;
}

export const TodoScreen: FC<ITodoScreenProps> = (props) => {
  const { name, seacrhedTodos, onClick }: ITodoScreenProps = {
    ...defaultProps,
    ...props,
  };

  const [clicked, setClicked] = useState(false);
  const [todo, setTodo] = useState<ITodo>();
  const [editedText, setEditedText] = useState("");
  const [todoz, setTodoz] = useState<ITodo[]>([]);
  const [todozText, setTodozText] = useState("");

  useEffect(() => {
    if (name.toLowerCase() === "today") {
      const data: ITodo[] = JSON.parse(localStorage.getItem("todos") || "[]");
      const todos = data.filter(
        (todo) => todo.type === "today" || todo.type === "important"
      );
      setTodoz(todos);
    } else if (name === "Searched") {
      setTodoz(seacrhedTodos);
    } else if (name === "Shopping List") {
      const data: ITodo[] = JSON.parse(localStorage.getItem("todos") || "[]");
      const todos = data.filter((todo) => todo.type === "shoppingList");
      setTodoz(todos);
    } else if (name === "Important") {
      const todayData = localStorage.getItem("todos") || "[]";
      const data2: ITodo[] = JSON.parse(todayData);
      const signedTodos = data2.filter((todo) => todo.important === true);
      setTodoz(signedTodos);
    }

    // getData();
  }, [name, seacrhedTodos]);

  const showEditBlock = (id: string) => {
    setClicked(true);
    setTodo(todoz.find((element) => element.id === id));
    const todoLocal = todoz.find((element) => element.id === id);
    setEditedText(todoLocal?.content || "");
  };

  const changeText = (text: string) => {
    if (todo?.content !== undefined) {
      todo.content = text;
      setTodo(todo);
    }
    setEditedText(text);
  };

  const editTodo = (key: React.KeyboardEvent) => {
    if (key.key === "Enter") {
      if (todo?.content !== "") {
        const todosLocal: ITodo[] = JSON.parse(
          localStorage.getItem("todos") || "[]"
        );
        const index = todosLocal.findIndex(
          (element) => element.id === todo?.id
        );
        const before = todosLocal.slice(0, index);
        const after = todosLocal.slice(index + 1);
        const newTodos = [...before, todo, ...after];
        localStorage.setItem("todos", JSON.stringify(newTodos));
        setClicked(false);
      }
    }
  };

  const getValue = (text: string) => {
    setTodozText(text);
  };

  const addTodo = useCallback(() => {
    if (todozText !== "") {
      const obj = {
        content: todozText,
        type: name === "Shopping List" ? "shoppingList" : name.toLowerCase(),
        id: nanoid(),
        important: false,
      };

      const newTodo: ITodo[] = [...todoz, obj];

      setTodoz(newTodo);
      setTodozText("");

      TodoService.create(obj);

      // if (element) {
      //   element.todos.push(obj);
      //   axios
      //     .put(`https://retoolapi.dev/xpODyJ/data/${element.id}`, {
      //       users: element.users,
      //       password: element.password,
      //       todos: element.todos,
      //     })
      //     .then((res) => {
      //       console.log(res);
      //       console.log(res.data);
      //     });
      // }
    }
  }, [todozText, name, todoz]);

  const delTodo = (id: string) => {
    const deletedTodo = todoz.filter((todo) => todo.id !== id);

    setTodoz(deletedTodo);

    TodoService.delete(id);
  };

  return (
    <div className={classes.screen}>
      <div className={classes.main}>
        <p className={classes.h1}>{name}</p>
        <div className={classes.grow}>
          {todoz.map((todo) => (
            <TodoBlock
              name={name}
              onClick={() => {
                onClick(todo.id);
                delTodo(todo.id);
              }}
              key={todo.id}
              text={todo.content}
              id={todo.id}
              onEdit={(id) => showEditBlock(id)}
            />
          ))}
        </div>
        {name !== "Searched" ? (
          <div className={classes.inputBlock}>
            <input
              value={todozText}
              // onKeyUp={(key) => onKeyUp(key)}
              onKeyUp={(key) => (key.key === "Enter" ? addTodo() : null)}
              // onChange={(event) => onChange(event.target.value)}
              onChange={(event) => getValue(event.target.value)}
              placeholder="What should be done"
              type="text"
              className={classNames("bp4-input .modifier", classes.inputTodo)}
            />
          </div>
        ) : null}
      </div>
      <Drawer
        onClose={() => {
          if (todo?.content !== "") {
            setClicked(false);
          }
        }}
        size={percent(40)}
        isOpen={clicked}
      >
        <div className={classes.edit}>
          <input
            className={classNames("bp4-input .modifier", classes.editInput)}
            value={editedText}
            onChange={(event) => changeText(event.target.value)}
            onKeyUp={(key) => editTodo(key)}
          />
          <Button
            className={classes.additionalButton}
            minimal
            text="Add additional todo"
          />
        </div>
      </Drawer>
    </div>
  );
};

const defaultProps: Required<ITodoScreenProps> = {
  name: "",
  seacrhedTodos: [],
  onChange: () => {},
  onKeyUp: () => {},
  todoText: "",
  onClick: () => {},
};
