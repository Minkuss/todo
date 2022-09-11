import { FC } from "react";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import { LoginForm } from "../Forms";
import { AuthRouter } from "../Forms/router";
import { MainScreen } from "../MainScreen";

export const CoreRouter: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthRouter />} />
        <Route path="/dashboard/*" element={<MainScreen />} />
        <Route path="*" element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  );
};
