import { ReactNode, createContext, useEffect, useState } from "react";
import { useToast } from "native-base";
import { User } from "@dtos/user";
import { api } from "../services/axios";
import { AppError } from "@utils/app-error";
import {
  storageUserDelete,
  storageUserGet,
  storageUserSave,
} from "@storage/storage-user";
import {
  storageAuthTokenDelete,
  storageAuthTokenGet,
  storageAuthTokenSave,
} from "@storage/storage-auth-token";

type AuthContextProps = {
  user: User;
  isLoadingUserStorage: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  getUserData: () => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [isLoadingUserStorage, setIsLoadingUserStorage] = useState(true);

  const toast = useToast();

  async function userAndTokenUpdate(user: User, token: string) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(user);
  }

  async function storageUserAndTokenSave(user: User, token: string) {
    try {
      setIsLoadingUserStorage(true);

      await storageUserSave(user);
      await storageAuthTokenSave(token);
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorage(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const response = await api.post("/sessions", { email, password });

      if (response.data) {
        const user = response.data.user;
        const token = response.data.token;

        await storageUserAndTokenSave(user, token);
        await userAndTokenUpdate(user, token);
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
      setIsLoadingUserStorage(true);

      const userLogged = await storageUserGet();
      const token = await storageAuthTokenGet();

      if (token && userLogged) {
        await userAndTokenUpdate(userLogged, token);
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
      await storageAuthTokenDelete();
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
      value={{ user, isLoadingUserStorage, signIn, signOut, getUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
}
