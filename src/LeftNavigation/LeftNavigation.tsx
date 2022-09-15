import { FC, useEffect, useState } from "react";
import axios from "axios";
import { Button, ButtonGroup, Card } from "@blueprintjs/core";

import * as classes from "./LeftNavigation.styles";
import classNames from "classnames";
import { NavLink, useLocation } from "react-router-dom";
import { ITodo } from "../types";

type LocationState = {
  username: string;
};

export const LeftNavigation: FC = () => {
  const [searchedTodos, setSearchedTodos] = useState<ITodo[]>([]);
  // const [users, setUsers] = useState([]);
  const location = useLocation();
  const state = location.state as LocationState;

  // useEffect(() => {
  //   const apiURL = "https://retoolapi.dev/xpODyJ/data";
  //   axios.get(apiURL).then((resp) => {
  //     const allUsers: [] = resp.data;
  //     setUsers(allUsers);
  //   });
  // }, [setUsers]);

  const onChange = (text: string) => {
    if (text !== "") {
      const todos: ITodo[] = JSON.parse(localStorage.getItem("todos") || "[]");
      setSearchedTodos(
        todos.filter((todo) =>
          todo.content.toLowerCase().includes(text.toLowerCase())
        )
      );
    } else {
      setSearchedTodos([]);
    }
  };

  return (
    <>
      <Card className={classes.card}>
        <div>
          {searchedTodos.map((el) => {
            return (
              <div
                key={el.id}
                style={{
                  display: "flex",
                }}
              >
                <span>{el.content}</span>
              </div>
            );
          })}
        </div>
        <ButtonGroup className={classes.btn_group} alignText="left" minimal>
          <input
            type="text"
            dir="auto"
            placeholder="Search todos"
            className={classNames("bp4-input .modifier", classes.input)}
            onChange={(event) => {
              onChange(event.target.value);
            }}
          />
          <NavLink
            className={classes.link}
            state={{ username: state.username }}
            to={"/dashboard/today"}
          >
            {({ isActive }) => (
              <Button
                intent={isActive ? "primary" : "none"}
                rightIcon="clean"
                className={classes.btn}
              >
                Today
              </Button>
            )}
          </NavLink>
          <NavLink
            className={classes.link}
            state={{ username: state.username }}
            to={"/dashboard/important"}
          >
            {({ isActive }) => (
              <Button
                intent={isActive ? "primary" : "none"}
                rightIcon="pin"
                className={classes.btn}
              >
                Important
              </Button>
            )}
          </NavLink>
          <NavLink
            className={classes.link}
            state={{ username: state.username }}
            to={"/dashboard/planned"}
          >
            {({ isActive }) => (
              <Button
                intent={isActive ? "primary" : "none"}
                rightIcon="calendar"
                className={classes.btn}
              >
                Planned
              </Button>
            )}
          </NavLink>
          <NavLink
            className={classes.link}
            state={{ username: state.username }}
            to={"/dashboard/shopping-list"}
          >
            {({ isActive }) => (
              <Button
                intent={isActive ? "primary" : "none"}
                rightIcon="shopping-cart"
                className={classes.btn}
              >
                Shopping List
              </Button>
            )}
          </NavLink>
          {/* {users.map((el: { users: string }) => (
            <div>{el.users}</div>
          ))} */}
        </ButtonGroup>
      </Card>
    </>
  );
};
