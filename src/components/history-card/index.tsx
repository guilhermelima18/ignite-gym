import { HStack, Heading, Text, VStack } from "native-base";

type HistoryCardProps = {
  history: {
    id: number;
    user_id: number;
    exercise_id: number;
    name: string;
    group: string;
    created_at: Date;
    hour: string;
  };
};

export const HistoryCard = ({ history }: HistoryCardProps) => {
  return (
    <HStack
      bg="gray.600"
      width="full"
      px={5}
      py={4}
      mb={3}
      rounded="md"
      alignItems="center"
      justifyContent="space-between"
    >
      <VStack mr={5} flex={1}>
        <Heading
          color="white"
          fontSize="md"
          textTransform="capitalize"
          fontFamily="heading"
          numberOfLines={1}
        >
          {history.group}
        </Heading>
        <Text color="gray.100" fontSize="lg" numberOfLines={1}>
          {history.name}
        </Text>
      </VStack>

      <Text color="gray.300" fontSize="md">
        {history.hour}
      </Text>
    </HStack>
  );
};
