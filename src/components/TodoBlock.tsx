import React, { FC, useCallback, useEffect, useState } from "react";
import { Button, Icon, IconName } from "@blueprintjs/core";

import * as classes from "./TodoBlock.styles";
import { ITodo } from "../types";
import { Link } from "react-router-dom";

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
  }, [props.id]);

  const signTodo = useCallback(() => {
    setClicked(!clicked);
    const todos: ITodo[] = JSON.parse(localStorage.getItem("todos") || "[]");
    todos.map((todo) => {
      if (todo.id === props.id) {
        todo.important = !clicked;
      }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [clicked, props.id]);

  const setIcons = useCallback(() => {
    setIcon("confirm");
  }, []);

  const returnIcon = useCallback(() => {
    setIcon("circle");
  }, []);

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
      {props.name !== "Shopping List" ? (
        <Button
          onClick={() => {
            if (props.name !== "Important") {
              signTodo();
            }
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
