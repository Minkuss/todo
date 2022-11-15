import { createContext } from "react";

export const UserContext = createContext({
  username: 'anon',
  setUsername: (value: string) => {},
});