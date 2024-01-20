import { useCallback, useEffect, useState } from "react";
import { HStack, VStack, FlatList, Heading, Text } from "native-base";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app-routes";
import { useAuth } from "@hooks/use-auth";
import { useGroups } from "@hooks/use-groups";
import { useExercises } from "@hooks/use-exercises";
import { useUser } from "@hooks/use-user";
import { Header } from "@components/header";
import { Group } from "@components/group";
import { ExerciseCard } from "@components/exercise-card";
import { Loading } from "@components/loading";

export function Home() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const { user, signOut } = useAuth();
  const { userLogged, getUser } = useUser();

  const { groups, getGroups } = useGroups();
  const { exercises, exercisesLoading, getExercises } = useExercises();

  const [groupSelected, setGroupSelected] = useState("antebraço");

  const handleOpenExerciseDetails = useCallback((exerciseId: string) => {
    navigation.navigate("exercise", { exerciseId });
  }, []);

  const handleChangeExercise = useCallback(async (group: string) => {
    setGroupSelected(group);
  }, []);

  useEffect(() => {
    getGroups();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getExercises(groupSelected);
    }, [groupSelected])
  );

  useFocusEffect(
    useCallback(() => {
      getUser({ email: user.email });
    }, [])
  );

  return (
    <VStack flex={1}>
      <Header user={userLogged} signOut={signOut} />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupSelected?.toLowerCase() === item?.toLowerCase()}
            onPress={() => handleChangeExercise(item)}
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

        {exercisesLoading ? (
          <Loading />
        ) : (
          <FlatList
            data={exercises}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ExerciseCard
                exercise={item}
                onPress={() => handleOpenExerciseDetails(item.id)}
              />
            )}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </VStack>
    </VStack>
  );
}
