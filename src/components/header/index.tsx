import { TouchableOpacity } from "react-native";
import { HStack, Heading, Text, VStack, Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "@hooks/use-auth";
import { UserPhoto } from "@components/user-photo";

import defaultUserPhotoImg from "../../assets/userPhotoDefault.png";

export const Header = () => {
  const { user, signOut } = useAuth();

  return (
    <HStack bgColor="gray.600" pt={16} pb={5} px={8} alignItems="center">
      <UserPhoto
        source={user?.avatar ? user?.avatar : defaultUserPhotoImg}
        alt="Avatar do usuário"
        size={16}
        mr={4}
      />
      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Olá,
        </Text>

        <Heading color="gray.100" fontSize="md" fontFamily="heading">
          {user?.name}
        </Heading>
      </VStack>

      <TouchableOpacity onPress={signOut}>
        <Icon as={MaterialIcons} name="logout" color="gray.200" size={7} />
      </TouchableOpacity>
    </HStack>
  );
};
