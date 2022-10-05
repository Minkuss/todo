import { FC, useEffect, useState } from "react";
import axios from "axios";
import { Button, ButtonGroup, Card, Drawer } from "@blueprintjs/core";

import * as classes from "./LeftNavigation.styles";
import classNames from "classnames";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ITodo } from "../types";
import { percent } from "csx";

type LocationState = {
  username: string;
  todos: ITodo[];
};

export const LeftNavigation: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;
  const [open, setOpen] = useState(false);

  const onChange = (text: string) => {
    const todos: ITodo[] = JSON.parse(localStorage.getItem("todos") || "[]");
    if (text !== "" && todos !== undefined) {
      navigate("/dashboard/searched", {
        state: {
          todos: todos.filter((todo) =>
            todo.content.toLowerCase().includes(text.toLowerCase())
          ),
        },
      });
    }
  };

  return (
    <>
      <Card className={classes.card}>
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
          <h3>{state.username}</h3>
          <div onClick={() => setOpen(true)} className={classes.burgerMenu}>
            <span className={classes.span}></span>
          </div>
        </ButtonGroup>
      </Card>
      <Drawer
        style={{
          width: percent(100),
        }}
        isOpen={open}
      >
        <ButtonGroup
          style={{
            display: "flex",
            flexDirection: "column",
          }}
          alignText="left"
          minimal
          onClick={() => setOpen(false)}
        >
          <NavLink
            className={classes.linkDrawer}
            state={{ username: state.username }}
            to={"/dashboard/today"}
          >
            {({ isActive }) => (
              <Button
                intent={isActive ? "primary" : "none"}
                rightIcon="clean"
                className={classes.btnDrawer}
              >
                Today
              </Button>
            )}
          </NavLink>
          <NavLink
            className={classes.linkDrawer}
            state={{ username: state.username }}
            to={"/dashboard/important"}
          >
            {({ isActive }) => (
              <Button
                intent={isActive ? "primary" : "none"}
                rightIcon="pin"
                className={classes.btnDrawer}
              >
                Important
              </Button>
            )}
          </NavLink>
          <NavLink
            className={classes.linkDrawer}
            state={{ username: state.username }}
            to={"/dashboard/shopping-list"}
          >
            {({ isActive }) => (
              <Button
                intent={isActive ? "primary" : "none"}
                rightIcon="shopping-cart"
                className={classes.btnDrawer}
              >
                Shopping List
              </Button>
            )}
          </NavLink>
        </ButtonGroup>
      </Drawer>
    </>
  );
};
