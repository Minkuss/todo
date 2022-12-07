import { getAuth } from "firebase/auth";
import { FC, useContext, useMemo, useState } from "react";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import { UserContext } from "../context/userNameContext";
import { LoginFormPage } from "../FormsPage";
import { MainScreen } from "../MainScreen";

export const CoreRouter: FC = () => {
  const { app } = useContext(UserContext);
  const auth = getAuth(app);
  const user = auth.currentUser;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard/*" element={<MainScreen />} />
        <Route path="*" element={<LoginFormPage />} />
      </Routes>
    </BrowserRouter>
  );
};
