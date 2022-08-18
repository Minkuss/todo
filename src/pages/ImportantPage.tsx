import { nanoid } from "nanoid";
import React, { FC, useCallback, useEffect, useState } from "react";
import { TodoScreen } from "../TodoScreen";
import { ITodos } from "../types";

export const ImportantScreen: FC = () => {
  
  const [todoText, setTodoText] = useState('');
  const [todos, setTodos] = useState<ITodos[]>([]);

  useEffect(() => {
    console.log('render');
    const data = localStorage.getItem('importantTodo') || "[]";
    setTodos(JSON.parse(data));
  }, []);

  const getValue = useCallback((text: string) => {
    setTodoText(text)
  }, []);

  const addTodo = useCallback(() => {
    const obj = {
      content: todoText,
      type: "important",
      id: nanoid(),  
    };

    const newTodo: ITodos[] = [
      ...todos, obj
    ];

    setTodos(newTodo);
    setTodoText('');

    localStorage.setItem('importantTodo', JSON.stringify(newTodo));

  }, [todoText, todos])

  const delTodo = useCallback((id: string) => {
    const deletedTodo = todos.filter(todo => todo.id !== id);


    localStorage.setItem('importantTodo', JSON.stringify(deletedTodo));
  }, [todos])

  return (
    <TodoScreen onClick = {(id) => delTodo(id)} todos = {todos} onKeyUp = {(key) => key.key === "Enter" ? addTodo() : null} todoText = {todoText} onChange = {(text) => getValue(text)} name = 'Important' />
  )
}