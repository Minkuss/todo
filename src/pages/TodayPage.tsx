import { nanoid } from "nanoid";
import React, { FC, useCallback, useEffect, useState } from "react";
import { TodoScreen } from "../TodoScreen";
import { ITodos } from "../types";

export const TodayScreen: FC = () => {
  
  const [todoText, setTodoText] = useState('');
  const [todos, setTodos] = useState<ITodos[]>([]);

  useEffect(() => {
    console.log('render');
    const data = localStorage.getItem('todayTodo') || "[]";
    setTodos(JSON.parse(data));
  }, []);

  const getValue = useCallback((text: string) => {
    setTodoText(text)
  }, []);

  const addTodo = useCallback(() => {
    const obj = {
      content: todoText,
      type: "today",
      id: nanoid(),  
    };

    const newTodo: ITodos[] = [
      ...todos, obj
    ];

    setTodos(newTodo);
    setTodoText('');

    localStorage.setItem('todayTodo', JSON.stringify(newTodo));

  }, [todoText, todos])

  const delTodo = useCallback((id: string) => {
    const deletedTodo = todos.filter(todo => todo.id !== id);

    setTodos(deletedTodo);

    localStorage.setItem('todayTodo', JSON.stringify(deletedTodo));
  }, [todos])

  const signTodo = useCallback((id: string) => {
    const clicked: boolean = JSON.parse(localStorage.getItem('todoCheck') || "false")
    todos.map(todo => {
      if (todo.id === id) {
        todo.important = clicked;
      };
    });
    localStorage.setItem('todayTodo', JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoScreen onImportant = {(id) => signTodo(id)} onClick = {(id) => delTodo(id)} todos = {todos} onKeyUp = {(key) => key.key === "Enter" ? addTodo() : null} todoText = {todoText} onChange = {(text) => getValue(text)} name = 'Today' />
  )
}