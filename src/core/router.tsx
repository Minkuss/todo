import { FC } from "react";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import { LoginFormPage } from "../FormsPage";
import { AuthRouter } from "../FormsPage/router";
import { MainScreen } from "../MainScreen";

export const CoreRouter: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthRouter />} />
        <Route path="/dashboard/*" element={<MainScreen />} />
        <Route path="*" element={<LoginFormPage />} />
      </Routes>
    </BrowserRouter>
  );
};
