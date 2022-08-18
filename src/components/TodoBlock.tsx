import React, { FC, useCallback, useState } from "react";
import { Button } from "@blueprintjs/core";

import * as classes from "./TodoBlock.styles"

interface ITodoBlock {
  text: string;
  onClick?: () => unknown;
}

export const TodoBlock: FC<ITodoBlock> = (props) => {
  const [clicked, setClicked] = useState(false);

  const setStyle = useCallback(() => {setClicked(true)}, [])

  return (
    <div className = {classes.todoBlock}>
      <Button onClick = {() => {
        if (props.onClick !== undefined) {
          props.onClick();
        };
        setStyle()
      }} icon = "circle" style = {clicked ? {textDecoration: "line-through"} : {}} alignText = "left" minimal className = {classes.todo}  text = {props.text} />
    </div>
  )
}