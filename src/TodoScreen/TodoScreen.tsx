import React, { FC } from "react";

import * as classes from "./TodoScreen.styles";
import { TodoBlock } from "../components";
import classNames from "classnames";
import { ITodos } from "../types";

interface ITodoScreenProps {
  name: string;
  todos?: ITodos[];
  onKeyUp?: (value: React.KeyboardEvent) => unknown; 
  onChange?: (value: string) => unknown;
  todoText?: string;
  onClick?: (value: string) => unknown;
  onImportant?: (value: string) => unknown;
}

export const TodoScreen: FC<ITodoScreenProps> = (props) => {
  const {
    name,
    todos,
    onKeyUp,
    onChange,
    todoText,
    onClick,
    onImportant,
  }: ITodoScreenProps = {
    ...defaultProps,
    ...props,
  };

  return (
    <div className={classes.main}>
      <p className={classes.h1}>{name}</p>
      <div className={classes.grow}>
        {todos.map((todo) => <TodoBlock onImportant = {() => onImportant(todo.id)} name = {name} onClick = {() => onClick(todo.id)} key = {todo.id} text = {todo.content} />)}
      </div>
      <div className={classes.inputBlock}>
        <input value = {todoText} onKeyUp = {(key) => onKeyUp(key)} onChange={(event) => onChange(event.target.value)} placeholder='What should be done' type="text" className={classNames("bp4-input .modifier", classes.inputTodo)} />
      </div>
    </div>
  )
}

const defaultProps: Required<ITodoScreenProps> = {
  name: '',
  todos: [],
  onChange: () => {},
  onKeyUp: () => {},
  todoText: "",
  onClick: () => {},
  onImportant: () => {},
}