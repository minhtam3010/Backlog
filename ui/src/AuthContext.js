import { createContext } from "react";

export const LoginContext = createContext({
    authenticated: false,
    setAuthenticated: () => {}
  });