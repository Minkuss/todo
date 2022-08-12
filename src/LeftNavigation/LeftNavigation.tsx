import React, { FC } from "react";
import { Route, Routes } from "react-router";
import { AnchorButton, ButtonGroup, Card, InputGroup } from "@blueprintjs/core";

import { ImportantScreen, PlannedScreen, ShoppingListScreen, StartScreen, TodayScreen } from "../pages";
import * as classes from './LeftNavigation.styles'

export const LeftNavigation: FC = () => {
  return (
    <>
      <Card className = {classes.card}>
        <ButtonGroup className = {classes.btn_group} alignText = "left" minimal vertical = {true} >
          <InputGroup placeholder = "Search todos" className = {classes.input}/>
          <AnchorButton href = "/today" className = {classes.btn}>Today</AnchorButton>
          <AnchorButton href = "/important" className = {classes.btn}>Important</AnchorButton>
          <AnchorButton href = "/planned" className = {classes.btn}>Planned</AnchorButton>
          <AnchorButton href = "/shopping-list" className = {classes.btn}>Shopping List</AnchorButton>
        </ButtonGroup>
      </Card>
      <Routes>
        <Route path = "/" element = {<StartScreen/>} />
        <Route path = "/today" element = {<TodayScreen/>} />
        <Route path = "/important" element = {<ImportantScreen/>} />
        <Route path = "/planned" element = {<PlannedScreen/>} />
        <Route path = "/shopping-list" element = {<ShoppingListScreen/>} />
      </Routes>
    </>
  )
}