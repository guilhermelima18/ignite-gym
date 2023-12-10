import { TouchableOpacity, ScrollView } from "react-native";
import { Center, VStack, Skeleton, Text, Heading } from "native-base";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { UsePhoto } from "@hooks/use-photo";
import { useAuth } from "@hooks/use-auth";
import { ScreenHeader } from "@components/screen-header";
import { UserPhoto } from "@components/user-photo";
import { Input } from "@components/input";
import { Button } from "@components/button";
import { useCallback } from "react";

const PHOTO_SIZE = 33;

type UserChangeProps = {
  name: string;
  email?: string;
  old_password: string;
  new_password: string;
  confirm_password: string;
};

const changeUserSchema = yup.object({
  name: yup.string().required("Nome é obrigatório."),
  email: yup.string().email(),
  old_password: yup.string().required("A senha antiga é obrigatória."),
  new_password: yup
    .string()
    .min(6, "A senha deve conter no mínimo 6 caracteres.")
    .required("A nova senha é obrigatória."),
  confirm_password: yup
    .string()
    .required("Confirme a senha.")
    .oneOf(
      [yup.ref("new_password"), null!],
      "A confirmação da senha não confere."
    ),
});

export function Profile() {
  const { user } = useAuth();
  const { userPhoto, photoIsLoading, handleUserPhotoSelect } = UsePhoto({
    defaultImageURL: "https://github.com/guilhermelima18.png",
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserChangeProps>({
    resolver: yupResolver(changeUserSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  const onUserChange = useCallback(async (data: UserChangeProps) => {
    console.log(data);
  }, []);

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil do usuário" />

      <ScrollView contentContainerStyle={{ paddingBottom: 25 }}>
        <Center mt={6} px={10}>
          {photoIsLoading ? (
            <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded="full"
              startColor="gray.500"
              endColor="gray.400"
            />
          ) : (
            <UserPhoto
              source={{ uri: userPhoto }}
              alt="Foto do usuário"
              size={PHOTO_SIZE}
            />
          )}

          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text
              color="green.500"
              fontWeight="bold"
              fontSize="md"
              mt={2}
              mb={8}
            >
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Controller
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                bgColor="gray.600"
                placeholder="Nome"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.name?.message}
              />
            )}
            name="name"
          />

          <Controller
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                bgColor="gray.600"
                placeholder="E-mail"
                value={value}
                onChangeText={onChange}
                isDisabled
                errorMessage={errors.email?.message}
              />
            )}
            name="email"
          />
        </Center>

        <VStack px={10} mt={12} mb={9}>
          <Heading color="gray.200" fontSize="md" mb={2} fontFamily="heading">
            Alterar senha
          </Heading>

          <Controller
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                bgColor="gray.600"
                placeholder="Senha antiga"
                value={value}
                onChangeText={onChange}
                secureTextEntry
                errorMessage={errors.old_password?.message}
              />
            )}
            name="old_password"
          />

          <Controller
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                bgColor="gray.600"
                placeholder="Nova senha"
                value={value}
                onChangeText={onChange}
                secureTextEntry
                errorMessage={errors.new_password?.message}
              />
            )}
            name="new_password"
          />

          <Controller
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                bgColor="gray.600"
                placeholder="Confirme a nova senha"
                value={value}
                onChangeText={onChange}
                secureTextEntry
                errorMessage={errors.confirm_password?.message}
              />
            )}
            name="confirm_password"
          />

          <Button
            title="Atualizar"
            isLoading={isSubmitting}
            onPress={handleSubmit(onUserChange)}
            mt={4}
          />
        </VStack>
      </ScrollView>
    </VStack>
  );
}
