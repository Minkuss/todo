import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LeftNavigation } from "../LeftNavigation";
import {
  ImportantScreen,
  PlannedScreen,
  ShoppingListScreen,
  StartScreen,
  TodayScreen,
} from "../pages";

import * as classes from "./MainScreen.styles";

export const MainScreen: FC = () => {
  return (
    <div className={classes.main}>
      <BrowserRouter>
        <LeftNavigation />
        <Routes>
          <Route path="/" element={<StartScreen />} />
          <Route path="/today" element={<TodayScreen />} />
          <Route path="/important" element={<ImportantScreen />} />
          <Route path="/planned" element={<PlannedScreen />} />
          <Route path="/shopping-list" element={<ShoppingListScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
