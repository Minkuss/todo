import { Button, Icon, IconName } from "@blueprintjs/core";
import React, { FC, useEffect, useState } from "react";
import { ITodo } from "../../types";
import * as classes from "./TodoBlock.styles";

interface ITodoBlock {
  text: string;
  onClick?: () => unknown;
  name: string;
  id: string;
  onEdit?: (value: string) => unknown;
}

export const TodoBlock: FC<ITodoBlock> = (props) => {
  const [clicked, setClicked] = useState(false);
  const [icon, setIcon] = useState<IconName>("circle");

  useEffect(() => {
    const todos: ITodo[] = JSON.parse(localStorage.getItem("todos") || "[]");
    todos.map((todo) => {
      if (todo.id === props.id) {
        if (todo.important !== undefined) {
          setClicked(todo.important);
        }
      }
    });
  });

  const signTodo = () => {
    setClicked(!clicked);
    const todos: ITodo[] = JSON.parse(localStorage.getItem("todos") || "[]");
    todos.map((todo) => {
      if (todo.id === props.id) {
        todo.important = !clicked;
      }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const setIcons = () => {
    setIcon("confirm");
  };

  const returnIcon = () => {
    setIcon("circle");
  };

  return (
    <div className={classes.todoBlock}>
      <Button
        onClick={props.onClick}
        className={classes.deleteTodo}
        minimal
        onMouseOver={setIcons}
        onMouseLeave={returnIcon}
      >
        <Icon size={18} icon={icon} />
      </Button>
      <Button
        alignText="left"
        minimal
        className={classes.todo}
        text={props.text}
        onClick={() => {
          if (props.onEdit !== undefined) {
            props.onEdit(props.id);
          }
        }}
      />
      {props.name !== "Shopping List" && props.name !== "additional" ? (
        <Button
          onClick={() => {
            signTodo();
          }}
          style={clicked === false ? { opacity: 0.5 } : { opacity: 1 }}
          className={classes.sign}
          icon="bookmark"
          minimal
        />
      ) : null}
    </div>
  );
};
