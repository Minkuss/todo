import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { LoginFormPage } from "./LoginFormPage";

export const AuthRouter: FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginFormPage />} />
    </Routes>
  );
};
