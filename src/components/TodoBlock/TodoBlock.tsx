import { Button, Icon, IconName } from "@blueprintjs/core";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { FC, useCallback, useContext, useEffect, useState } from "react";
import { db } from "../..";
import { UserContext } from "../../context/userNameContext";
import { ITodo } from "../../types";
import * as classes from "./TodoBlock.styles";

interface ITodoBlock {
  text: string;
  onClick?: () => unknown;
  name: string;
  id: string;
  onEdit?: (value: string) => unknown;
}

export const TodoBlock: FC<ITodoBlock> = (props) => {
  const [clicked, setClicked] = useState(false);
  const [icon, setIcon] = useState<IconName>("circle");
  const { auth } = useContext(UserContext);
  const username = auth.currentUser?.email || "anon";

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

  useEffect(() => {
    dataSnap.then((value) => {
      const todos: ITodo[] = value !== undefined ? value.todos : [];
      todos.map((todo) => {
        if (todo.id === props.id) {
          if (todo.important !== undefined) {
            setClicked(todo.important);
          }
        }
      });
    });
  });

  const signTodo = () => {
    setClicked(!clicked);
    dataSnap.then(async (value) => {
      const todos: ITodo[] = value !== undefined ? value.todos : [];
      todos.map((todo) => {
        if (todo.id === props.id) {
          todo.important = !clicked;
        }
      });
      await setDoc(doc(db, "users", username != null ? username : "anon"), {
        email: username,
        todos: todos,
      });
    });
  };

  const setIcons = () => {
    setIcon("confirm");
  };

  const returnIcon = () => {
    setIcon("circle");
  };

  return (
    <div className={classes.todoBlock}>
      <Button
        onClick={props.onClick}
        className={classes.deleteTodo}
        minimal
        onMouseOver={setIcons}
        onMouseLeave={returnIcon}
      >
        <Icon size={18} icon={icon} />
      </Button>
      <Button
        alignText="left"
        minimal
        className={classes.todo}
        text={props.text}
        onClick={() => {
          if (props.onEdit !== undefined) {
            props.onEdit(props.id);
          }
        }}
      />
      {props.name !== "Shopping List" && props.name !== "additional" ? (
        <Button
          onClick={() => {
            signTodo();
          }}
          style={clicked === false ? { opacity: 0.5 } : { opacity: 1 }}
          className={classes.sign}
          icon="bookmark"
          minimal
        />
      ) : null}
    </div>
  );
};
