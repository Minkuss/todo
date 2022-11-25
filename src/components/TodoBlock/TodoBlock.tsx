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
  signTodo?: () => unknown;
  onEdit?: (value: string) => unknown;
  name: string;
  id: string;
}

export const TodoBlock: FC<ITodoBlock> = (props) => {
  const { text, onClick, name, id, onEdit, signTodo }: ITodoBlock = {
    ...defaultProps,
    ...props,
  };

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
    console.log("render");
    dataSnap.then((value) => {
      const todos: ITodo[] = value !== undefined ? value.todos : [];
      todos.forEach((todo) => {
        if (todo.id === id) {
          if (todo.important !== undefined) {
            setClicked(todo.important);
          }
        }
      });
    });
  }, []);

  const setIcons = () => {
    setIcon("confirm");
  };

  const returnIcon = () => {
    setIcon("circle");
  };

  return (
    <div className={classes.todoBlock}>
      <Button
        onClick={onClick}
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
        text={text}
        onClick={() => {
          onEdit(id);
        }}
      />
      {name !== "Shopping List" && name !== "additional" ? (
        <Button
          onClick={() => {
            signTodo();
            setClicked(!clicked);
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

const defaultProps: Required<ITodoBlock> = {
  text: "",
  onClick: () => {},
  signTodo: () => {},
  name: "",
  id: "",
  onEdit: () => {},
};
