import { useCallback, useState } from "react";
import { useToast } from "native-base";
import { AppError } from "@utils/app-error";
import { api } from "../services/axios";

export function useGroups() {
  const toast = useToast();

  const [groups, setGroups] = useState<string[]>([]);

  const getGroups = useCallback(async () => {
    try {
      const response = await api.get("/groups");

      if (response.data) {
        setGroups(response.data);
      }
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os grupos musculares.";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    }
  }, []);

  return {
    groups,
    getGroups,
  };
}
