import { useCallback, useState } from "react";
import { useToast } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app-routes";
import { api } from "@services/axios";
import { History } from "@dtos/history";
import { AppError } from "@utils/app-error";

export function useHistory() {
  const toast = useToast();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const [histories, setHistories] = useState<History[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [registerHistoryLoading, setRegisterHistoryLoading] = useState(false);

  const getHistory = useCallback(async () => {
    try {
      setHistoryLoading(true);

      const response = await api.get("/history");

      if (response.data) {
        setHistories(response.data);
      }
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar seu histórico de exercícios.";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setHistoryLoading(false);
    }
  }, []);

  const registerHistory = useCallback(async (exerciseId: string) => {
    try {
      setRegisterHistoryLoading(true);

      await api.post("/history", { exercise_id: exerciseId });

      toast.show({
        title: "Exercício finalizado com sucesso.",
        placement: "top",
        bgColor: "green.500",
      });

      navigation.navigate("history");
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível registrar o exercício no seu histórico.";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setRegisterHistoryLoading(false);
    }
  }, []);

  return {
    histories,
    historyLoading,
    registerHistoryLoading,
    getHistory,
    registerHistory,
  };
}
