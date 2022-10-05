import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { LeftNavigation } from "../LeftNavigation";
import {
  ImportantScreen,
  ShoppingListScreen,
  TodayScreen,
  SearchPage,
} from "../pages";

import * as classes from "./MainScreen.styles";

export const MainScreen: FC = () => {
  return (
    <div className={classes.main}>
      <LeftNavigation />
      <Routes>
        <Route path="/today" element={<TodayScreen />} />
        <Route path="/important" element={<ImportantScreen />} />
        <Route path="/shopping-list" element={<ShoppingListScreen />} />
        <Route path="/searched" element={<SearchPage />} />
      </Routes>
    </div>
  );
};
