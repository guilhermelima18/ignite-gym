import { ReactNode } from "react";
import { AuthProvider } from "./auth";

type AppContextProps = {
  children: ReactNode;
};

export function AppContext({ children }: AppContextProps) {
  return <AuthProvider>{children}</AuthProvider>;
}
