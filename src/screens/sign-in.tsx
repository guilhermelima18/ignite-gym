import { VStack, Image, Text, Center, Heading, ScrollView } from "native-base";
import { Input } from "@components/input";
import { Button } from "@components/button";
import BackgroundImg from "@assets/background.png";
import LogoIcon from "@assets/logo.svg";

export function SignIn() {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack bgColor="gray.700" flex={1} px={10} pb={16}>
        <Image
          source={BackgroundImg}
          alt="Pessoas treinando"
          resizeMode="contain"
          position="absolute"
        />

        <Center my={24}>
          <LogoIcon />

          <Text color="gray.100" fontSize="sm">
            Treine sua mente e o seu corpo
          </Text>
        </Center>

        <Heading
          color="gray.100"
          textAlign="center"
          fontSize="xl"
          fontFamily="heading"
          mb={4}
        >
          Acesse sua conta
        </Heading>

        <Center>
          <Input
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="E-mail"
          />
          <Input secureTextEntry placeholder="Senha" />

          <Button title="Acessar" />
        </Center>

        <Center mt={24}>
          <Text color="gray.100" fontSize="sm" fontFamily="body" mb={2}>
            Ainda não tem acesso?
          </Text>

          <Button title="Criar conta" variant="outline" />
        </Center>
      </VStack>
    </ScrollView>
  );
}
