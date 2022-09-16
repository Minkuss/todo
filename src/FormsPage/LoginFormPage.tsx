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
import { apiURL } from "../urls";

export const LoginFormPage: FC = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);
  const [apidata, setapiData] = useState<IApiData[]>([]);
  const [match, setMacth] = useState(false);

  useEffect(() => {
    axios.get(apiURL).then((resp) => {
      const data: [] = resp.data;
      setapiData(data);
    });
  }, []);

  const getLoginFormData = (data: { username: string; password: string }) => {
    apidata.map((el: { users: string; password: string; todos: ITodo[] }) => {
      if (el.users === data.username && el.password === data.password) {
        navigate("/dashboard", {
          state: { username: el.users },
        });

        return 0;
      }
    });
  };

  const getRegisterFormData = (data: {
    username: string;
    password: string;
  }) => {
    let flag = apidata.find(
      (el: { users: string; password: string }) => el.users === data.username // проверка на одинаковые emails
    );
    if (flag === undefined) {
      axios
        .post(apiURL, {
          users: data.username,
          password: data.password,
          todos: [],
        })
        .then((res) => {
          console.log(res);
          console.log(res.data);
        });
      setMacth(false);
      navigate("/dashboard", { state: { username: data.username } });
    } else {
      setMacth(!match);
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
        <RegisterForm
          match={match}
          onSubmit={(data) => getRegisterFormData(data)}
        />
      )}
      {/* </div> */}
    </div>
  );
};
