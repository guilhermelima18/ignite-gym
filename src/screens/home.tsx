import { VStack } from "native-base";
import { Header } from "@components/header";
import { Group } from "@components/group";

export function Home() {
  return (
    <VStack flex={1}>
      <Header />

      <Group name="Costas" />
    </VStack>
  );
}
