import React, { FC } from "react";
import { Route, Routes } from "react-router";
import { AnchorButton, Button, ButtonGroup, Card, InputGroup } from "@blueprintjs/core";

import { ImportantScreen, PlannedScreen, ShoppingListScreen, StartScreen, TodayScreen } from "../pages";
import * as classes from './LeftNavigation.styles'
import { url } from "csx";
import classNames from "classnames";

export const LeftNavigation: FC = () => {
  return (
    <>
      {/* <div className = {classes.burgerMenu}><span className = {classes.span}></span></div> */}
      <Card className = {classes.card}>
        <ButtonGroup className = {classes.btn_group} alignText = "left" minimal >
          {/* <InputGroup placeholder = "Search todos" className = {classes.input}/> */}
          <input type = "text" dir = "auto" placeholder = "Search todos" className = {classNames("bp4-input .modifier", classes.input)}/>
          <AnchorButton rightIcon = "clean" href = "/today" className = {classes.btn}>Today</AnchorButton>
          <AnchorButton rightIcon = "pin" href = "/important" className = {classes.btn}>Important</AnchorButton>
          <AnchorButton rightIcon = "calendar" href = "/planned" className = {classes.btn}>Planned</AnchorButton>
          <AnchorButton rightIcon = "form" href = "/shopping-list" className = {classes.btn}>Shopping List</AnchorButton>
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