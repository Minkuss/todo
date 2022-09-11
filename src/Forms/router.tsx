import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { LoginForm } from "./LoginForm";

export const AuthRouter: FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
    </Routes>
  );
};
