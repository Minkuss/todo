import { FC } from "react";
import { Card, FormGroup, InputGroup } from "@blueprintjs/core";
import { useNavigate } from "react-router-dom";

import * as classes from "./LoginFormPage.styles";
import { LoginForm } from "../components/LoginForm";

export const LoginFormPage: FC = () => {
  const navigate = useNavigate();

  return (
    <div className={classes.main}>
      <LoginForm />
    </div>
  );
};
