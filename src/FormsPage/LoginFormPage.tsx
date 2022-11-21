import { FC, useContext, useState } from "react";
import { Button, ButtonGroup } from "@blueprintjs/core";
import { useNavigate } from "react-router-dom";

import * as classes from "./LoginFormPage.styles";
import { LoginForm } from "../components/forms";
import { RegisterForm } from "../components/forms";
import classNames from "classnames";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { UserContext } from "../context/userNameContext";

export const LoginFormPage: FC = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);
  const [match, setMatch] = useState(false);
  const { auth } = useContext(UserContext);

  const getLoginFormData = (data: { username: string; password: string }) => {
    signInWithEmailAndPassword(auth, data.username, data.password)
      .then(() => {
        navigate("/dashboard");
      })
      .catch((error) => {
        const errorMessage = error.massage;
        const errorCode = error.code;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };

  const getRegisterFormData = (data: {
    username: string;
    password: string;
  }) => {
    createUserWithEmailAndPassword(auth, data.username, data.password)
      .then(() => {
        navigate("/dashboard");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };

  return (
    <div className={classes.main}>
      <ButtonGroup className={classes.btnGroup} minimal>
        <Button
          fill
          className={classNames(classes.btn, classes.signIn)}
          onClick={() => setVisible(true)}
          text="Sign in"
          active={visible}
        />
        <Button
          fill
          className={classNames(classes.btn, classes.signUp)}
          onClick={() => setVisible(false)}
          text="Sign up"
          active={!visible}
        />
      </ButtonGroup>
      {visible ? (
        <LoginForm onSubmit={(data) => getLoginFormData(data)} />
      ) : (
        <RegisterForm
          match={match}
          onSubmit={(data) => getRegisterFormData(data)}
        />
      )}
    </div>
  );
};
