import { Heading, VStack, SectionList, Text } from "native-base";
import { ScreenHeader } from "@components/screen-header";
import { HistoryCard } from "@components/history-card";

const sectionListData = [
  {
    title: "26.08.23",
    data: ["Puxada frontal", "Remada unilateral"],
  },
  {
    title: "13.11.23",
    data: ["Rosca alternada", "Rosca martelo"],
  },
];

export function History() {
  return (
    <VStack>
      <ScreenHeader title="Histórico de exercícios" />

      <SectionList
        sections={sectionListData}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <HistoryCard />}
        renderSectionHeader={({ section }) => (
          <Heading color="gray.200" fontSize="md" mt={10} mb={3}>
            {section?.title}
          </Heading>
        )}
        contentContainerStyle={
          !sectionListData.length && { flex: 1, justifyContent: "center" }
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
    </VStack>
  );
}
