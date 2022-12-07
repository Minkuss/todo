import { FC, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useAuthStatus } from "../hooks/use-auth-status";
import { LeftNavigation } from "../LeftNavigation";
import {
  ImportantScreen,
  ShoppingListScreen,
  TodayScreen,
  SearchPage,
} from "../pages";

import * as classes from "./MainScreen.styles";

export const MainScreen: FC = () => {
  const authStatus = useAuthStatus();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("authRender");
    if (authStatus !== "unauthenticated") return;
    navigate("/login");
  }, [authStatus, navigate]);

  return authStatus === "authenticated" ? (
    <div className={classes.main}>
      <LeftNavigation />
      <Routes>
        <Route path="/today" element={<TodayScreen />} />
        <Route path="/important" element={<ImportantScreen />} />
        <Route path="/shopping-list" element={<ShoppingListScreen />} />
        <Route path="/searched" element={<SearchPage />} />
      </Routes>
    </div>
  ) : null;
};
