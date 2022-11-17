import React, { FC, useCallback, useContext, useEffect, useState } from "react";
import { Button, Drawer, Icon, InputGroup } from "@blueprintjs/core";
import classNames from "classnames";
import { percent } from "csx";
import { nanoid } from "nanoid";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import { TodoBlock } from "../components/TodoBlock/TodoBlock";
import { TodoService } from "../services/TodoService";
import { IAdditionalTodo, ITodo } from "../types";
import * as classes from "./TodoScreen.styles";
import { UserContext } from "../context/userNameContext";
import { db } from "..";

interface ITodoScreenProps {
  name: string;
  seacrhedTodos?: ITodo[];
  onKeyUp?: (value: React.KeyboardEvent) => unknown;
  onChange?: (value: string) => unknown;
  todoText?: string;
  onClick?: (value: string) => unknown;
}

export const TodoScreen: FC<ITodoScreenProps> = (props) => {
  const { name, seacrhedTodos, onClick }: ITodoScreenProps = {
    ...defaultProps,
    ...props,
  };

  const [clicked, setClicked] = useState(false);

  const [todo, setTodo] = useState<ITodo>();

  const [editedText, setEditedText] = useState("");

  const [todoz, setTodoz] = useState<ITodo[]>([]);

  const [todozText, setTodozText] = useState("");

  const [focus, setFocus] = useState(false);

  const [additionalTodoText, setAdditionalTodoText] = useState("");

  const [additionalTodos, setAdditionalTodos] = useState<IAdditionalTodo[]>([]);

  // const { username } = useContext(UserContext);
  const username = localStorage.getItem("username") || "";

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
    // fetching data from localstorage
    // const data: ITodo[] = JSON.parse(localStorage.getItem("todos") || "[]");
    dataSnap.then((value) => {
      const data: ITodo[] = value !== undefined ? value.todos : [];
      if (name.toLowerCase() === "today") {
        const todos = data.filter(
          (todo) => todo.type === "today" || todo.type === "important"
        );
        setTodoz(todos);
      } else if (name === "Searched") {
        setTodoz(seacrhedTodos);
      } else if (name === "Shopping List") {
        const todos = data.filter((todo) => todo.type === "shoppingList");
        setTodoz(todos);
      } else if (name === "Important") {
        const signedTodos = data.filter((todo) => todo.important === true);
        setTodoz(signedTodos);
      }
      const todosLocal: ITodo[] = data;

      // fetching additional todo for current todo
      todosLocal.map((todoLoc) => {
        if (todoLoc.id === todo?.id) {
          setAdditionalTodos(todoLoc.additionalTodos || []);
        }
      });
    });

    // getData();
  }, [getData, name, seacrhedTodos, todo?.id]);

  const showEditBlock = (id: string) => {
    // showing drawer
    setClicked(true);
    setTodo(todoz.find((element) => element.id === id));
    const todoLocal = todoz.find((element) => element.id === id);
    setEditedText(todoLocal?.content || "");
  };

  const changeText = (text: string) => {
    // change todo.content || change todo text
    if (todo?.content !== undefined) {
      todo.content = text;
      setTodo(todo);
    }
    setEditedText(text);
  };

  const editTodo = (key: React.KeyboardEvent) => {
    if (key.key === "Enter") {
      if (todo?.content !== "") {
        // const todosLocal: ITodo[] = JSON.parse(
        //   localStorage.getItem("todos") || "[]"
        // );
        dataSnap.then(async (value) => {
          const data: ITodo[] = value !== undefined ? value.todos : [];
          const todosLocal = data;
          const index = todosLocal.findIndex(
            (element) => element.id === todo?.id
          );
          const before = todosLocal.slice(0, index);
          const after = todosLocal.slice(index + 1);
          if (todo !== undefined) {
            const newTodos = [...before, todo, ...after];
            // localStorage.setItem("todos", JSON.stringify(newTodos));
            setClicked(false);
            setTodoz(newTodos);
            await setDoc(
              doc(db, "users", username != null ? username : "anon"),
              {
                email: username,
                todos: newTodos,
              }
            );
          }
        });
      }
    }
  };

  const getValue = (text: string) => {
    // getting input value for todo
    setTodozText(text);
  };

  const addTodo = async () => {
    if (todozText !== "") {
      const obj = {
        content: todozText,
        type: name === "Shopping List" ? "shoppingList" : name.toLowerCase(),
        id: nanoid(),
        important: name === "Important" ? true : false,
      };

      const newTodo: ITodo[] = [...todoz, obj];

      setTodoz(newTodo);
      setTodozText("");

      TodoService.create(obj, dataSnap);
    }
  };

  const delTodo = async (id: string) => {
    const deletedTodo = todoz.filter((todo) => todo.id !== id);

    setTodoz(deletedTodo);

    TodoService.delete(id, dataSnap);
  };

  const delAdditionalTodo = async (id: string) => {
    if (todo?.additionalTodos !== undefined) {
      const deletedTodo = additionalTodos.filter((el) => el.id !== id);
      // localStorage.setItem("todos", JSON.stringify(todoz));
      setAdditionalTodos(deletedTodo);
      dataSnap.then(async (value) => {
        const todos: ITodo[] = value !== undefined ? value.todos : [];
        todos.map((todoLocal) => {
          if (todoLocal.id === todo?.id) {
            todoLocal.additionalTodos = deletedTodo;
          }
        });
        await updateDoc(
          doc(db, "users", username != null ? username : "anon"),
          {
            todos: todos,
          }
        );
      });
    }
  };

  const getAdditionalText = (text: string) => {
    // getting input value for additional todo content
    setAdditionalTodoText(text);
  };

  const addAdditionalTodo = useCallback(() => {
    // adding additional todo for current todo
    if (additionalTodoText !== "") {
      const obj = {
        content: additionalTodoText,
        id: nanoid(),
      };
      const newAdditioalTodo: IAdditionalTodo[] = [
        ...(additionalTodos || []),
        obj,
      ];
      setAdditionalTodos(newAdditioalTodo);
      setAdditionalTodoText("");
      dataSnap.then(async (value) => {
        const todos: ITodo[] = value !== undefined ? value.todos : [];
        todos.map((todoLocal) => {
          if (todoLocal.id === todo?.id) {
            todoLocal.additionalTodos = newAdditioalTodo;
          }
        });
        await updateDoc(
          doc(db, "users", username != null ? username : "anon"),
          {
            todos: todos,
          }
        );
      });
    }
  }, [additionalTodoText, additionalTodos, dataSnap, todo?.id, username]);

  return (
    <div className={classes.screen}>
      <div className={classes.main}>
        <p className={classes.h1}>{name}</p>
        <div className={classes.grow}>
          {todoz.map((todo) => (
            <TodoBlock
              name={name}
              onClick={() => {
                onClick(todo.id);
                delTodo(todo.id);
              }}
              key={todo.id}
              text={todo.content}
              id={todo.id}
              onEdit={(id) => showEditBlock(id)}
            />
          ))}
        </div>
        {name !== "Searched" ? (
          <div className={classes.inputBlock}>
            <input
              value={todozText}
              // onKeyUp={(key) => onKeyUp(key)}
              onKeyUp={(key) => (key.key === "Enter" ? addTodo() : null)}
              // onChange={(event) => onChange(event.target.value)}
              onChange={(event) => getValue(event.target.value)}
              placeholder="What should be done"
              type="text"
              className={classNames("bp4-input .modifier", classes.inputTodo)}
            />
          </div>
        ) : null}
      </div>
      <Drawer
        onClose={() => {
          if (todo?.content !== "") {
            setClicked(false);
          }
        }}
        size={percent(40)}
        isOpen={clicked}
      >
        <div className={classes.edit}>
          <input
            className={classNames("bp4-input .modifier", classes.editInput)}
            value={editedText}
            onChange={(event) => changeText(event.target.value)}
            onKeyUp={(key) => editTodo(key)}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: percent(90),
            }}
            className={classes.editInput}
          >
            <Icon icon={focus ? "circle" : "plus"} />
            <input
              className={classNames("bp4-input", classes.additionalInput)}
              placeholder="Add additional task"
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              onKeyUp={(key) =>
                key.key === "Enter" ? addAdditionalTodo() : null
              }
              onChange={(event) => getAdditionalText(event.target.value)}
              value={additionalTodoText}
            />
          </div>
          <div
            style={{
              display: "block",
              width: percent(90),
            }}
          >
            {additionalTodos.map((additionalTodo) => (
              <TodoBlock
                key={additionalTodo.id}
                name="additional"
                id={additionalTodo.id}
                text={additionalTodo.content}
                onClick={() => delAdditionalTodo(additionalTodo.id)}
              />
            ))}
          </div>
        </div>
      </Drawer>
    </div>
  );
};

const defaultProps: Required<ITodoScreenProps> = {
  name: "",
  seacrhedTodos: [],
  onChange: () => {},
  onKeyUp: () => {},
  todoText: "",
  onClick: () => {},
};
