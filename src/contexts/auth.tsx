import { ReactNode, createContext, useEffect, useState } from "react";
import { useToast } from "native-base";
import { User } from "../dto/user";
import { api } from "../libs/axios";
import { AppError } from "@utils/app-error";
import {
  storageUserDelete,
  storageUserGet,
  storageUserSave,
} from "@storage/storage-user";

type UserToken = {
  token: string;
  refresh_token: string;
};

type AuthContextProps = {
  user: User;
  userToken: UserToken;
  isLoadingUserStorage: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [userToken, setUserToken] = useState<UserToken>({} as UserToken);
  const [isLoadingUserStorage, setIsLoadingUserStorage] = useState(true);

  const toast = useToast();

  async function signIn(email: string, password: string) {
    try {
      const response = await api.post("/sessions", { email, password });

      if (response.data) {
        setUser(response.data.user);

        setUserToken({
          token: response.data.token,
          refresh_token: response.data.refresh_token,
        });

        storageUserSave(response.data.user);
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

  async function getUserData() {
    try {
      const userLogged = await storageUserGet();

      if (userLogged) {
        setUser(userLogged);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorage(false);
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserStorage(true);
      setUser({} as User);

      await storageUserDelete();
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorage(false);
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, userToken, isLoadingUserStorage, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
