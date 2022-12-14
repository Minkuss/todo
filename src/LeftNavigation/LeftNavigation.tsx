import { FC, useCallback, useContext, useState } from "react";
import { Button, ButtonGroup, Card, Drawer } from "@blueprintjs/core";

import * as classes from "./LeftNavigation.styles";
import classNames from "classnames";
import { NavLink, useNavigate } from "react-router-dom";
import { ITodo } from "../types";
import { percent } from "csx";
import { UserContext } from "../context/userNameContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "..";

export const LeftNavigation: FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { auth } = useContext(UserContext);
  const username = auth.currentUser?.email;

  const getData = useCallback(async () => {
    const docRef = doc(db, "users", username != null ? username : "anon");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("Error, no such document");
    }
  }, [username]);

  const dataSnap = getData();

  const onChange = useCallback(
    (text: string) => {
      dataSnap.then((value) => {
        const todos: ITodo[] = value !== undefined ? value.todos : [];
        if (text !== "" && todos !== undefined) {
          navigate("/dashboard/searched", {
            state: {
              todos,
              text,
            },
          });
        }
      });
    },
    [dataSnap, navigate]
  );

  const logOut = () => {
    auth.signOut();
    navigate("/");
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
          <div style={{ flexGrow: "1" }}></div>
          <Button onClick={logOut} style={{ flexShrink: "0" }} text="Log out" />
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
          <NavLink className={classes.linkDrawer} to={"/dashboard/today"}>
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
          <NavLink className={classes.linkDrawer} to={"/dashboard/important"}>
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
