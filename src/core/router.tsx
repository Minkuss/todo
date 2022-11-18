import { FC, useContext, useMemo, useState } from "react";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import { UserContext } from "../context/userNameContext";
import { LoginFormPage } from "../FormsPage";
import { MainScreen } from "../MainScreen";

export const CoreRouter: FC = () => {
  const { auth } = useContext(UserContext);
  const user = auth.currentUser;
  console.log(user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard/*" element={<MainScreen />} />
        <Route path="*" element={<LoginFormPage />} />
      </Routes>
    </BrowserRouter>
  );
};
