import { FC, useMemo, useState } from "react";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import { UserContext } from "../context/userNameContext";
import { LoginFormPage } from "../FormsPage";
import { AuthRouter } from "../FormsPage/router";
import { MainScreen } from "../MainScreen";

export const CoreRouter: FC = () => {
  const [username, setUsername] = useState("anon");
  const value = useMemo(() => ({ username, setUsername }), [username]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthRouter />} />
        <Route
          path="/dashboard/*"
          element={
            <UserContext.Provider value={value}>
              <MainScreen />
            </UserContext.Provider>
          }
        />
        <Route
          path="*"
          element={
            <UserContext.Provider value={value}>
              <LoginFormPage />
            </UserContext.Provider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
