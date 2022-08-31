import { FC, useState } from "react";
import { Button, ButtonGroup, Card } from "@blueprintjs/core";

import * as classes from "./LeftNavigation.styles";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { ITodo } from "../types";

export const LeftNavigation: FC = () => {
  const [searchedTodos, setSearchedTodos] = useState<ITodo[]>([]);

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
          <NavLink className={classes.link} to={"/today"}>
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
          <NavLink className={classes.link} to={"/important"}>
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
          <NavLink className={classes.link} to={"/planned"}>
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
          <NavLink className={classes.link} to={"/shopping-list"}>
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
        </ButtonGroup>
      </Card>
    </>
  );
};
