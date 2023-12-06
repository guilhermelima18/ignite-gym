import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useTheme, Box } from "native-base";
import { AuthRoutes } from "./auth-routes";
import { AppRoutes } from "./app-routes";
import { useAuth } from "@hooks/use-auth";
import { Loading } from "@components/loading";

export function Routes() {
  const { colors } = useTheme();
  const { user, isLoadingUserStorage } = useAuth();

  const theme = DefaultTheme;

  theme.colors.background = colors.gray["700"];

  if (isLoadingUserStorage) {
    return <Loading />;
  }

  return (
    <Box flex={1} bgColor="gray.700">
      <NavigationContainer theme={theme}>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  );
}
