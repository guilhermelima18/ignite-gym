import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  VStack,
  Image,
  Text,
  Center,
  Heading,
  ScrollView,
  useToast,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { api } from "../libs/axios";
import { Input } from "@components/input";
import { Button } from "@components/button";
import { AppError } from "@utils/app-error";

import BackgroundImg from "@assets/background.png";
import LogoIcon from "@assets/logo.svg";

type CreateUserAccount = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
};

const createUserSchema = yup.object({
  name: yup.string().required("Informe o nome."),
  email: yup.string().required("Informe o e-mail.").email("E-mail inválido."),
  password: yup
    .string()
    .required("Informe a senha.")
    .min(6, "A senha deve conter no mínimo 6 caracteres."),
  password_confirm: yup
    .string()
    .required("Confirme a senha.")
    .oneOf([yup.ref("password"), null!], "A confirmação da senha não confere."),
});

export function SignUp() {
  const navigation = useNavigation();
  const toast = useToast();

  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserAccount>({
    resolver: yupResolver(createUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirm: "",
    },
    mode: "onChange",
  });

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleCreateAccount = useCallback(async (data: CreateUserAccount) => {
    setLoading(true);

    try {
      const response = await api.post("/users", {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (response?.data) {
        navigation.goBack();
      }
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível criar a conta. Tente novamente mais tarde.";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setLoading(false);
    }
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
          Crie sua conta
        </Heading>

        <Center>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                value={value}
                errorMessage={errors.name?.message}
                onChangeText={onChange}
              />
            )}
            name="name"
          />

          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="E-mail"
                value={value}
                errorMessage={errors.email?.message}
                onChangeText={onChange}
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
                errorMessage={errors.password?.message}
                onChangeText={onChange}
              />
            )}
            name="password"
          />

          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                secureTextEntry
                placeholder="Confirme a senha"
                value={value}
                errorMessage={errors.password_confirm?.message}
                onChangeText={onChange}
              />
            )}
            name="password_confirm"
          />

          <Button
            title="Criar e acessar"
            onPress={handleSubmit(handleCreateAccount)}
            loading={isSubmitting || loading}
            isDisabled={isSubmitting || loading}
          />
        </Center>

        <Center mt={5}>
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
