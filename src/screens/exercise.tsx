import { useCallback, useEffect } from "react";
import {
  HStack,
  Heading,
  Icon,
  Text,
  VStack,
  Image,
  Box,
  ScrollView,
} from "native-base";
import { TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app-routes";
import { useExercises } from "@hooks/use-exercises";
import { api } from "@services/axios";
import { Feather } from "@expo/vector-icons";
import { Button } from "@components/button";
import { Loading } from "@components/loading";

import BodySvg from "@assets/body.svg";
import SeriesSvg from "@assets/series.svg";
import RepetitionsSvg from "@assets/repetitions.svg";
import { useHistory } from "@hooks/use-history";

type RouteParams = {
  exerciseId: string;
};

export function Exercise() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const { exercise, exerciseLoading, getExerciseById } = useExercises();
  const { registerHistoryLoading, registerHistory } = useHistory();

  const route = useRoute();

  const { exerciseId } = route.params as RouteParams;

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, []);

  const handleRegisterHistory = useCallback(async (exerciseId: string) => {
    await registerHistory(exerciseId);
  }, []);

  useEffect(() => {
    getExerciseById(exerciseId);
  }, [exerciseId]);

  return (
    <VStack flex={1}>
      <VStack px={8} bg="gray.600" pt={12}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
        </TouchableOpacity>

        <HStack
          justifyContent="space-between"
          mt={4}
          mb={8}
          alignItems="center"
        >
          <Heading color="gray.100" fontSize="lg" flexShrink={1}>
            {exercise.name}
          </Heading>

          <HStack alignItems="center">
            <BodySvg />
            <Text color="gray.200" ml={1} textTransform="capitalize">
              {exercise.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>

      {exerciseLoading ? (
        <Loading />
      ) : (
        <ScrollView>
          <VStack p={8}>
            <Box rounded="lg" mb={3} overflow="hidden">
              <Image
                w="full"
                h={80}
                source={{
                  uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`,
                }}
                alt="Nome do exercício"
                resizeMode="cover"
              />
            </Box>

            <Box bgColor="gray.600" rounded="md" pb={4} px={4}>
              <HStack
                alignItems="center"
                justifyContent="space-between"
                mb={6}
                mt={5}
              >
                <HStack>
                  <SeriesSvg />
                  <Text color="gray.200" ml={2}>
                    {exercise.series} séries
                  </Text>
                </HStack>

                <HStack>
                  <RepetitionsSvg />
                  <Text color="gray.200" ml={2}>
                    {exercise.repetitions} repetições
                  </Text>
                </HStack>
              </HStack>

              <Button
                title="Marcar como realizado"
                isLoading={registerHistoryLoading}
                onPress={() => handleRegisterHistory(exerciseId)}
              />
            </Box>
          </VStack>
        </ScrollView>
      )}
    </VStack>
  );
}
