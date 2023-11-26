import { useCallback, useState } from "react";
import { HStack, VStack, FlatList, Heading, Text } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app-routes";
import { Header } from "@components/header";
import { Group } from "@components/group";
import { ExerciseCard } from "@components/exercise-card";

const groupsList = ["costa", "ombro", "biceps", "triceps"];
const exercises = [
  "Puxa frontal",
  "Remada curvada",
  "Remada unilateral",
  "Levantamento terra",
  "Rosca alternada",
  "Rosca martelo",
];

export function Home() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const [groupSelected, setGroupSelected] = useState("costa");

  const handleChangeGroupSelected = useCallback((group: string) => {
    setGroupSelected(group);
  }, []);

  const handleOpenExerciseDetails = useCallback(() => {
    navigation.navigate("exercise");
  }, []);

  return (
    <VStack flex={1}>
      <Header />

      <FlatList
        data={groupsList}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupSelected.toLowerCase() === item.toLowerCase()}
            onPress={() => handleChangeGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        my={10}
        maxH={10}
        minH={10}
      />

      <VStack flex={1} px={8}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md">
            Exercícios
          </Heading>

          <Text color="gray.200" fontSize="sm">
            {exercises?.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <ExerciseCard exercise={item} onPress={handleOpenExerciseDetails} />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>
    </VStack>
  );
}
