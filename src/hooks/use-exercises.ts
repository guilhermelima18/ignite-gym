import { useCallback, useState } from "react";
import { useToast } from "native-base";
import { api } from "../services/axios";
import { AppError } from "@utils/app-error";
import { Exercise } from "@dtos/exercise";

export function useExercises() {
  const toast = useToast();

  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [exercise, setExercise] = useState<Exercise>({} as Exercise);
  const [exercisesLoading, setExercisesLoading] = useState(false);
  const [exerciseLoading, setExerciseLoading] = useState(false);

  const getExercises = useCallback(async (groupName: string) => {
    try {
      setExercisesLoading(true);

      const response = await api.get(`/exercises/bygroup/${groupName}`);

      if (response.data) {
        setExercises(response.data);
      }
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os exercícios.";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setExercisesLoading(false);
    }
  }, []);

  const getExerciseById = useCallback(async (exerciseId: string) => {
    try {
      setExerciseLoading(true);

      const response = await api.get(`/exercises/${exerciseId}`);

      if (response.data) {
        setExercise(response.data);
      }
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar o exercício.";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setExerciseLoading(false);
    }
  }, []);

  return {
    exercises,
    exercise,
    exercisesLoading,
    exerciseLoading,
    getExercises,
    getExerciseById,
  };
}
