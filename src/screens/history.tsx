import { useCallback } from "react";
import { Heading, VStack, SectionList, Text } from "native-base";
import { useFocusEffect } from "@react-navigation/native";
import { useHistory } from "@hooks/use-history";
import { ScreenHeader } from "@components/screen-header";
import { HistoryCard } from "@components/history-card";
import { Loading } from "@components/loading";

export function History() {
  const { histories, historyLoading, getHistory } = useHistory();

  useFocusEffect(
    useCallback(() => {
      getHistory();
    }, [])
  );

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de exercícios" />

      {historyLoading ? (
        <Loading />
      ) : (
        <SectionList
          sections={histories}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <HistoryCard history={item} />}
          renderSectionHeader={({ section }) => (
            <Heading
              color="gray.200"
              fontSize="md"
              mt={10}
              mb={3}
              fontFamily="heading"
            >
              {section.title}
            </Heading>
          )}
          contentContainerStyle={
            !histories.length && { flex: 1, justifyContent: "center" }
          }
          ListEmptyComponent={() => (
            <Text color="gray.100" textAlign="center">
              Não há exercícios registrados ainda. {"\n"}
              Vamos fazer exercícios hoje?
            </Text>
          )}
          showsVerticalScrollIndicator={false}
          px={8}
        />
      )}
    </VStack>
  );
}
