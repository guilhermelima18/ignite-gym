import { VStack, Image, Text, Center, Heading, ScrollView } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Input } from "@components/input";
import { Button } from "@components/button";
import BackgroundImg from "@assets/background.png";
import LogoIcon from "@assets/logo.svg";

export function SignUp() {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10} pb={16}>
        <Image
          source={BackgroundImg}
          alt="Pessoas treinando"
          resizeMode="contain"
          position="absolute"
          defaultSource={BackgroundImg}
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
          Crie sua conta
        </Heading>

        <Center>
          <Input placeholder="Nome" />
          <Input
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="E-mail"
          />
          <Input secureTextEntry placeholder="Senha" />

          <Button title="Criar e acessar" />
        </Center>

        <Center mt={24}>
          <Button
            title="Voltar para o login"
            variant="outline"
            onPress={handleGoBack}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
}
