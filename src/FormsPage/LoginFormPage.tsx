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

export const LoginFormPage: FC = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);
  const [apidata, setapiData] = useState([]);
  const apiURL = "https://retoolapi.dev/xpODyJ/data";

  useEffect(() => {
    axios.get(apiURL).then((resp) => {
      const data: [] = resp.data;
      setapiData(data);
    });
  }, []);

  const getLoginFormData = (data: { username: string; password: string }) => {
    apidata.map((el: { users: string; password: number }) => {
      if (
        el.users === data.username &&
        el.password.toString() === data.password
      ) {
        navigate("/dashboard", { state: { username: el.users } });

        return 0;
      }
    });
  };

  const getRegisterFormData = (data: {
    username: string;
    password: string;
  }) => {
    // const user = {
    //   users: data.username,
    //   password: data.password,
    //   id: nanoid(),
    //   todos: [],
    // };
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
