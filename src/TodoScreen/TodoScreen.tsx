import { H1 } from "@blueprintjs/core";
import React, { FC } from "react";

interface ITodoScreenProps {
  text: string;
}

export const TodoScreen: FC<ITodoScreenProps> = (props) => {
  return (
    <H1>{props.text}</H1>
  )
}