import { FC, useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  FormGroup,
  InputGroup,
} from "@blueprintjs/core";
import { useNavigate } from "react-router-dom";

import * as classes from "./LoginFormPage.styles";
import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from "../components/RegisterForm";

export const LoginFormPage: FC = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);

  const getLoginFormData = (data: { username: string; password: string }) => {
    if (data.username === "bebra") {
      navigate("/dashboard");
      console.log("true");
    }
  };

  const getRegisterFormData = (data: {
    username: string;
    password: string;
  }) => {
    if (data.username === "bebra") {
      navigate("/dashboard");
      console.log("true");
    }
  };

  return (
    <div className={classes.main}>
      <ButtonGroup>
        <Button onClick={() => setVisible(true)} text="Sign in" />
        <Button onClick={() => setVisible(false)} text="Sign up" />
      </ButtonGroup>
      {/* <div style={{ width: "100%", display: "flex", justifyContent: "center" }}> */}
      {visible ? (
        <LoginForm onSubmit={(data) => getLoginFormData(data)} />
      ) : (
        <RegisterForm onSubmit={(data) => getRegisterFormData(data)} />
      )}
      {/* </div> */}
    </div>
  );
};
