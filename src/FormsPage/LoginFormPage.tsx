import { FC, useEffect, useState } from "react";
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

export const LoginFormPage: FC = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);
  const [apidata, setapiData] = useState<IApiData[]>([]);
  const [match, setMatch] = useState(false);

  useEffect(() => {}, []);

  const getLoginFormData = (data: { username: string; password: string }) => {
    // apidata.map((el: { users: string; password: string; todos: ITodo[] }) => {
    //   if (el.users === data.username && el.password === data.password) {
    //     navigate("/dashboard", {
    //       state: { username: el.users },
    //     });
    //     return 0;
    //   }
    // });

    axios
      .post(apiUrl + "/users/login", {
        username: data.username,
        password: data.password,
      })
      .then((resp) => {
        console.log(resp);
        console.log(resp.data);
        sessionStorage.setItem("token", JSON.stringify(resp.data.token));
      });
    let token = sessionStorage.getItem("token");
    if (token) {
      axios
        .get(apiUrl + "/users", {
          headers: {
            Authorization: JSON.parse(token),
          },
        })
        .then((resp) => {
          const data: [] = resp.data;
          setapiData(data);
          console.log(data);
        });
    }
  };

  const getRegisterFormData = (data: {
    username: string;
    password: string;
  }) => {
    // let flag = apidata.find(
    //   (el: { users: string; password: string }) => el.users === data.username // проверка на одинаковые emails
    // );
    // if (flag === undefined) {
    //   axios
    //     .post(apiURL, {
    //       users: data.username,
    //       password: data.password,
    //       todos: [],
    //     })
    //     .then((res) => {
    //       console.log(res);
    //       console.log(res.data);
    //     });
    //   setMatch(false);
    //   navigate("/dashboard", { state: { username: data.username } });
    // } else {
    //   setMatch(!match);
    // }
    axios
      .post(apiUrl + "/users/signup", {
        username: data.username,
        password: data.password,
      })
      .then((resp) => {
        console.log(resp);
        console.log(resp.data);
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
