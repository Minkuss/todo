import { FC, useEffect, useState } from "react";
import axios from "axios";
import { Button, ButtonGroup, Card } from "@blueprintjs/core";

import * as classes from "./LeftNavigation.styles";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { ITodo } from "../types";

export const LeftNavigation: FC = () => {
  const [searchedTodos, setSearchedTodos] = useState<ITodo[]>([]);
  const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   const apiURL = "https://todo-project.up.railway.app/api/users";
  //   axios.get(apiURL).then((resp) => {
  //     const allUsers: [] = resp.data;
  //     console.log(allUsers);
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
          <NavLink className={classes.link} to={"/dashboard/today"}>
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
          <NavLink className={classes.link} to={"/dashboard/important"}>
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
          <NavLink className={classes.link} to={"/dashboard/planned"}>
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
          <NavLink className={classes.link} to={"/dashboard/shopping-list"}>
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
          {/* {users.map((el: { name: string }) => (
            <div>{el.name}</div>
          ))} */}
        </ButtonGroup>
      </Card>
    </>
  );
};
