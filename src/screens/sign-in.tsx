import { useNavigation } from "@react-navigation/native";
import { VStack, Image, Text, Center, Heading, ScrollView } from "native-base";
import { Controller, useForm } from "react-hook-form";
import { AuthNavigatorRoutesProps } from "@routes/auth-routes";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@components/input";
import { Button } from "@components/button";

import BackgroundImg from "@assets/background.png";
import LogoIcon from "@assets/logo.svg";
import { useCallback } from "react";

type LoginUser = {
  email: string;
  password: string;
};

const loginUserSchema = yup.object({
  email: yup.string().required("Informe o e-mail.").email("E-mail inválido."),
  password: yup
    .string()
    .required("Informe a senha.")
    .min(6, "A senha deve ter no mínimo 6 caractéres."),
});

export function SignIn() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUser>({ resolver: yupResolver(loginUserSchema) });
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const handleNewAccount = () => {
    navigation.navigate("signUp");
  };

  const handleUserLogin = useCallback(async (data: LoginUser) => {
    console.log(data);
  }, []);

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
          Acesse sua conta
        </Heading>

        <Center>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                keyboardType="email-address"
                autoCapitalize="none"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.email?.message}
                placeholder="E-mail"
              />
            )}
            name="email"
          />

          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                secureTextEntry
                placeholder="Senha"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
            name="password"
          />

          <Button title="Acessar" onPress={handleSubmit(handleUserLogin)} />
        </Center>

        <Center mt={24}>
          <Text color="gray.100" fontSize="sm" fontFamily="body" mb={2}>
            Ainda não tem acesso?
          </Text>

          <Button
            title="Criar conta"
            variant="outline"
            onPress={handleNewAccount}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
}
