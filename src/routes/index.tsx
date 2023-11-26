import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useTheme, Box } from "native-base";
import { useUserContext } from "@contexts/user";
import { AuthRoutes } from "./auth-routes";
import { AppRoutes } from "./app-routes";

export function Routes() {
  const { user } = useUserContext();
  const { colors } = useTheme();

  const theme = DefaultTheme;

  theme.colors.background = colors.gray["700"];

  return (
    <Box flex={1} bgColor="gray.700">
      <NavigationContainer theme={theme}>
        <AuthRoutes />
      </NavigationContainer>
    </Box>
  );
}
