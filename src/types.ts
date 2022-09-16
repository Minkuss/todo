export interface ITodo {
  content: string;
  status?: string;
  type: string;
  important: boolean;
  id: string;
};

export type IApiData = {
  users: string;
  password: string;
  id?: number;
  todos: ITodo[];
};