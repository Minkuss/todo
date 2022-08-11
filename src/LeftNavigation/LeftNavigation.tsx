import { Button, ButtonGroup, Card } from "@blueprintjs/core";
import React, { FC } from "react";
import { Route, Routes } from "react-router";
import { TodoScreen } from "../TodoScreen";
import * as classes from './LeftNavigation.styles'

export const LeftNavigation: FC = () => {
  return (
    <>
      <Card>
        <ButtonGroup minimal vertical = {true} >
          <a href="/today">today</a>
          <Button className = {classes.btn}>Today</Button>
          <Button className = {classes.btn}>Important</Button>
          <Button className = {classes.btn}>Planned</Button>
          <Button className = {classes.btn}>Shopping List</Button>
        </ButtonGroup>
      </Card>
      <Routes>
        <Route path = "/today" element = {<TodoScreen/>} />
      </Routes>
    </>
  )
}