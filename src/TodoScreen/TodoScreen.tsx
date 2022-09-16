import { Drawer } from "@blueprintjs/core";
import classNames from "classnames";
import { percent } from "csx";
import React, { FC, useEffect, useState } from "react";
import { TodoBlock } from "../components/TodoBlock/TodoBlock";
import { ITodo } from "../types";
import * as classes from "./TodoScreen.styles";

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
  const [editedText, setedEditText] = useState("");

  // useEffect(() => {
  //   console.log("screen");
  // }, [onClick]);

  const showEditBlock = (id: string) => {
    setClicked(true);
    setTodo(todos.find((element) => element.id === id));
    const todoLocal = todos.find((element) => element.id === id);
    setedEditText(todoLocal?.content || "");
  };

  const changeText = (text: string) => {
    if (todo?.content !== undefined) {
      todo.content = text;
      setTodo(todo);
    }
    setedEditText(text);
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
            value={editedText}
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
