import { useCallback, useState } from "react";
import { useToast } from "native-base";
import { api } from "@services/axios";
import { User } from "@dtos/user";
import { AppError } from "@utils/app-error";

type GetUserRequest = {
  email: string;
};

type CreateUserRequest = {
  name: string;
  email: string;
  password: string;
};

type UpdateUserRequest = {
  name: string;
  password: string;
  old_password: string;
};

export function useUser() {
  const toast = useToast();

  const [getUserLoading, setGetUserLoading] = useState(false);
  const [createUserLoading, setCreateUserLoading] = useState(false);
  const [updateUserLoading, setUpdateUserLoading] = useState(false);

  const [userLogged, setUserLogged] = useState<User>({} as User);

  const getUser = useCallback(async ({ email }: GetUserRequest) => {
    try {
      setGetUserLoading(true);
      const response = await api.get("/users", { params: { email } });

      if (response) {
        setUserLogged(response.data);
      }
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível buscar o usuário.";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setGetUserLoading(false);
    }
  }, []);

  const createUser = useCallback(async (user: CreateUserRequest) => {
    try {
      setCreateUserLoading(true);

      const response = await api.post("/users", { ...user });

      if (response) {
        const messageSuccess = "Usuário criado com sucesso.";

        toast.show({
          title: messageSuccess,
          placement: "top",
          bgColor: "green.500",
        });
      }

      return response;
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível atualizar o usuário.";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setCreateUserLoading(false);
    }
  }, []);

  const updateUser = useCallback(async (user: UpdateUserRequest) => {
    try {
      setUpdateUserLoading(true);

      const response = await api.put("/users", { ...user });

      if (response) {
        const messageSuccess = "Usuário atualizado com sucesso.";

        toast.show({
          title: messageSuccess,
          placement: "top",
          bgColor: "green.500",
        });
      }

      return response;
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível atualizar o usuário.";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setUpdateUserLoading(false);
    }
  }, []);

  return {
    userLogged,
    getUserLoading,
    createUserLoading,
    updateUserLoading,
    getUser,
    createUser,
    updateUser,
  };
}
