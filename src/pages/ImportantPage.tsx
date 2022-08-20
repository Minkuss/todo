import { nanoid } from "nanoid";
import React, { FC, useCallback, useEffect, useState } from "react";
import { TodoScreen } from "../TodoScreen";
import { ITodos } from "../types";

export const ImportantScreen: FC = () => {
  
  const [todoText, setTodoText] = useState('');
  const [todos, setTodos] = useState<ITodos[]>([]);

  useEffect(() => {
    console.log('render');
    // const importantData = localStorage.getItem('importantTodo') || "[]";
    const todayData = localStorage.getItem('todayTodo') || "[]";
    // const data1: ITodos[] = JSON.parse(importantData);
    const data2: ITodos[] = JSON.parse(todayData);
    // const data = data1.concat(data2)
    const signedTodos = data2.filter(todo => todo.important === true);
    setTodos(signedTodos);
  }, []);

  const getValue = useCallback((text: string) => {
    setTodoText(text)
  }, []);

  const addTodo = useCallback(() => {
    const obj = {
      content: todoText,
      type: "important",
      id: nanoid(),
      important: true,  
    };

    const newTodo: ITodos[] = [
      ...todos, obj
    ];

    setTodos(newTodo);
    setTodoText('');

    localStorage.setItem('importantTodo', JSON.stringify(newTodo));

  }, [todoText, todos])

  // const delTodo = useCallback((id: string) => {
  //   const deletedTodo = todos.filter(todo => todo.id !== id);

  //   setTodos(deletedTodo);

  //   localStorage.setItem('importantTodo', JSON.stringify(deletedTodo));
  // }, [todos])

  return (
    <TodoScreen todos = {todos} onKeyUp = {(key) => key.key === "Enter" ? addTodo() : null} todoText = {todoText} onChange = {(text) => getValue(text)} name = 'Important' />
  )
}