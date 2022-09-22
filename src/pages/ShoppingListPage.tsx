import { nanoid } from "nanoid";
import { FC, useEffect, useState } from "react";
import { TodoService } from "../services/TodoService";
import { TodoScreen } from "../TodoScreen";
import { ITodo } from "../types";

export const ShoppingListScreen: FC = () => {
  return <TodoScreen name="Shopping List" />;
};
