import React, { FC, useCallback, useEffect, useState } from "react";
import { Button } from "@blueprintjs/core";

import * as classes from "./TodoBlock.styles"

interface ITodoBlock {
  text: string;
  onClick?: () => unknown;
  onImportant?: () => unknown;
  name: string;
}

export const TodoBlock: FC<ITodoBlock> = (props) => {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('todoCheck') || "false";
    setClicked(JSON.parse(data));
  }, []);

  const setStyle = useCallback(() => {
    setClicked(!clicked);
    localStorage.setItem("todoCheck", JSON.stringify(!clicked));
  }, [clicked])

  return (
    <div className = {classes.todoBlock}>
      <Button onClick = {props.name === "Important" ? undefined : props.onClick} icon = "circle" alignText = "left" minimal className = {classes.todo}  text = {props.text} />
      {props.name !== "Important" ? <Button onClick = {() => {
        setStyle();
        if (props.onImportant !== undefined) {
          props.onImportant();
        };
      }} style = { !clicked ? {opacity: 0.7} : {opacity: 1}} className = {classes.edit} icon = "bookmark" minimal /> : null}
    </div>
  )
}