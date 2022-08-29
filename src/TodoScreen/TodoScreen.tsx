import React, { FC, useCallback, useState } from "react";

import * as classes from "./TodoScreen.styles";
import { TodoBlock } from "../components";
import classNames from "classnames";
import { ITodo } from "../types";
import { Button, Card, Drawer, H1, TextArea } from "@blueprintjs/core";
import { percent, px } from "csx";

interface ITodoScreenProps {
  name: string;
  todos?: ITodo[];
  onKeyUp?: (value: React.KeyboardEvent) => unknown;
  onChange?: (value: string) => unknown;
  todoText?: string;
  onClick?: (value: string) => unknown;
}

export const TodoScreen: FC<ITodoScreenProps> = (props) => {
  const {
    name,
    todos,
    onKeyUp,
    onChange,
    todoText,
    onClick,
  }: ITodoScreenProps = {
    ...defaultProps,
    ...props,
  };

  const [clicked, setClicked] = useState(false);
  const [todo, setTodo] = useState<ITodo>();
  const [editText, setEditText] = useState("");

  const showEditBlock = useCallback(
    (id: string) => {
      setClicked(true);
      setTodo(todos.find((element) => element.id === id));
      const todoLocal = todos.find((element) => element.id === id);
      setEditText(todoLocal?.content || "");
    },
    [todos]
  );

  const changeText = useCallback(
    (text: string) => {
      if (todo?.content !== undefined) {
        todo.content = text;
        setTodo(todo);
      }
      setEditText(text);
    },
    [todo]
  );

  const editTodo = useCallback(
    (key: React.KeyboardEvent) => {
      if (key.key === "Enter") {
        if (todo?.content !== "") {
          const index = todos.findIndex((element) => element.id === todo?.id);
          const before = todos.slice(0, index);
          const after = todos.slice(index + 1);
          const newTodos = [...before, todo, ...after];
          localStorage.setItem("todos", JSON.stringify(newTodos));
          setClicked(false);
        }
      }
    },
    [todo, todos]
  );

  return (
    <div className={classes.screen}>
      <div className={classes.main}>
        <p className={classes.h1}>{name}</p>
        <div className={classes.grow}>
          {todos.map((todo) => (
            <TodoBlock
              name={name}
              onClick={() => onClick(todo.id)}
              key={todo.id}
              text={todo.content}
              id={todo.id}
              onEdit={(id) => showEditBlock(id)}
            />
          ))}
        </div>
        <div className={classes.inputBlock}>
          <input
            value={todoText}
            onKeyUp={(key) => onKeyUp(key)}
            onChange={(event) => onChange(event.target.value)}
            placeholder="What should be done"
            type="text"
            className={classNames("bp4-input .modifier", classes.inputTodo)}
          />
        </div>
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
            value={editText}
            onChange={(event) => changeText(event.target.value)}
            onKeyUp={(key) => editTodo(key)}
          />
        </div>
      </Drawer>
    </div>
  );
};

const defaultProps: Required<ITodoScreenProps> = {
  name: "",
  todos: [],
  onChange: () => {},
  onKeyUp: () => {},
  todoText: "",
  onClick: () => {},
};
