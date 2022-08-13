import React, { FC } from "react";
import { Checkbox, H1, Label } from "@blueprintjs/core";

import * as classes from "./TodoScreen.styles";
import { TodoBlock } from "../components";
import classNames from "classnames";

interface ITodoScreenProps {
  text: string;
}

export const TodoScreen: FC<ITodoScreenProps> = (props) => {
  return (
    <div className = {classes.main}>
      <p className = {classes.h1}>{props.text}</p>
      <div className = {classes.grow}>
        <TodoBlock/>
      </div>
      <input type="text" className = {classNames("bp4-input .modifier", classes.inputTodo)} />
    </div>
  )
}