import React, { FC } from "react";
import { LeftNavigation } from "../LeftNavigation";
import { TodoScreen } from "../TodoScreen";

import * as classes from "./MainScreen.styles"

export const MainScreen: FC = () => {
  return (
    <div className = {classes.main}>
      <LeftNavigation/>
      <TodoScreen/>
    </div>
  )
}