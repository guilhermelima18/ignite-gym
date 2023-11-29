import { ReactNode, createContext, useState } from "react";
import { useToast } from "native-base";
import { User } from "../dto/user";
import { api } from "../libs/axios";
import { AppError } from "@utils/app-error";

type UserToken = {
  token: string;
  refresh_token: string;
};

type AuthContextProps = {
  user: User;
  userToken: UserToken;
  signIn: (email: string, password: string) => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [userToken, setUserToken] = useState<UserToken>({} as UserToken);

  const toast = useToast();

  async function signIn(email: string, password: string) {
    try {
      const response = await api.post("/sessions", { email, password });

      if (response.data) {
        setUser({
          ...user,
          id: response.data.user.id,
          name: response.data.user.name,
        });

        setUserToken({
          token: response.data.token,
          refresh_token: response.data.refresh_token,
        });
      }
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível fazer login na sua conta. Tente novamente.";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

  return (
    <AuthContext.Provider value={{ user, userToken, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
