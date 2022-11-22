import { FC, useContext, useState } from "react";
import { Alert, Button, ButtonGroup, Spinner } from "@blueprintjs/core";
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
import { percent, px } from "csx";

export const LoginFormPage: FC = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);
  const [match, setMatch] = useState(false);
  const { auth } = useContext(UserContext);
  const [loadingState, setLoadingState] = useState(false);

  const getLoginFormData = (data: { username: string; password: string }) => {
    setLoadingState(true);
    signInWithEmailAndPassword(auth, data.username, data.password)
      .then(() => {
        navigate("/dashboard");
        setLoadingState(false);
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
    setLoadingState(true);
    createUserWithEmailAndPassword(auth, data.username, data.password)
      .then(() => {
        navigate("/dashboard");
        setLoadingState(false);
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
      {loadingState && (
        <div
          style={{
            width: percent(100),
            height: percent(100),
            zIndex: "999",
            position: "absolute",
            backdropFilter: "blur(25px)",
          }}
        >
          <Spinner
            style={{
              position: "relative",
              top: percent(50),
            }}
            size={100}
            intent="primary"
          />
        </div>
      )}
    </div>
  );
};
