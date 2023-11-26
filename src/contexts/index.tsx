import { ReactNode } from "react";
import { UserProvider } from "./user";

type AppContextProps = {
  children: ReactNode;
};

export function AppContext({ children }: AppContextProps) {
  return <UserProvider>{children}</UserProvider>;
}
