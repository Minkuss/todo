import { FC, useContext, useEffect, useState } from "react";
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
import axios from "axios";
import { nanoid } from "nanoid";
import { IApiData, ITodo } from "../types";
import { apiUrl } from "../urls";
import classNames from "classnames";
import { app } from "../index";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { UserContext } from "../context/userNameContext";

export const LoginFormPage: FC = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);
  const [apidata, setapiData] = useState<IApiData[]>([]);
  const [match, setMatch] = useState(false);
  const { username, setUsername } = useContext(UserContext);
  const auth = getAuth(app);

  const getLoginFormData = (data: { username: string; password: string }) => {
    signInWithEmailAndPassword(auth, data.username, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/dashboard");
        setUsername(user.email != null ? user.email : "anon");
        localStorage.setItem(
          "username",
          JSON.stringify(user.email != null ? user.email : "anon")
        );
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
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/dashboard");
        setUsername(user.email != null ? user.email : "anon");
        localStorage.setItem(
          "username",
          JSON.stringify(user.email != null ? user.email : "anon")
        );
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
      {/* <div style={{ width: "100%", display: "flex", justifyContent: "center" }}> */}
      {visible ? (
        <LoginForm onSubmit={(data) => getLoginFormData(data)} />
      ) : (
        <RegisterForm
          match={match}
          onSubmit={(data) => getRegisterFormData(data)}
        />
      )}
      {/* </div> */}
    </div>
  );
};
