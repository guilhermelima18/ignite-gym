import { useCallback } from "react";
import { TouchableOpacity, ScrollView } from "react-native";
import { Center, VStack, Skeleton, Text, Heading } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { UsePhoto } from "@hooks/use-photo";
import { useAuth } from "@hooks/use-auth";
import { useUser } from "@hooks/use-user";
import { AppNavigatorRoutesProps } from "@routes/app-routes";
import { ScreenHeader } from "@components/screen-header";
import { UserPhoto } from "@components/user-photo";
import { Input } from "@components/input";
import { Button } from "@components/button";

const PHOTO_SIZE = 33;

type UserChangeProps = {
  name: string;
  email?: string;
  old_password?: string;
  new_password?: string;
  confirm_password?: string;
};

const changeUserSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email(),
  old_password: yup.string(),
  new_password: yup
    .string()
    .min(6, "A senha deve conter no mínimo 6 caracteres."),
  confirm_password: yup
    .string()
    .oneOf(
      [yup.ref("new_password"), null!],
      "A confirmação da senha não confere."
    )
    .when("new_password", {
      is: (field: any) => field,
      then: yup.string().required("Informe a confirmação de senha"),
    }),
});

export function Profile() {
  const { user, getUserData } = useAuth();
  const { updateUser } = useUser();
  const { userPhoto, photoIsLoading, handleUserPhotoSelect } = UsePhoto({
    defaultImageURL: "https://github.com/guilhermelima18.png",
  });

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(changeUserSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  const onUserChange = useCallback(async (data: UserChangeProps) => {
    const updateUserObj = {
      name: data.name,
      password: data.new_password!,
      old_password: data.old_password!,
    };

    const response = await updateUser(updateUserObj);

    if (response) {
      await getUserData();

      setTimeout(() => {
        navigation.navigate("home");
      }, 500);
    }
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
