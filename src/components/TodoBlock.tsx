import React, { FC } from "react";
import { Checkbox, Button } from "@blueprintjs/core";

import * as classes from "./TodoBlock.styles"
import classNames from "classnames";

export const TodoBlock: FC = () => {
  return (
    <div className = {classes.todoBlock}>
      <Button icon = "circle" alignText = "left" minimal className = {classes.todo}  text = "Use todo"/>
    </div>
  )
}