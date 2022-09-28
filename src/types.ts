export interface ITodo {
  content: string;
  status?: string;
  type: string;
  important: boolean;
  id: string;
  additionalTodos?: IAdditionalTodo[];
};

export type IApiData = {
  users: string;
  password: string;
  id?: number;
  todos: ITodo[];
};

export interface IAdditionalTodo {
  content: string;
  status?: string;
  type?: string;
  id: string;
}